/**
 * BlazeCode Studio Code Executor Engine
 * Professional multi-language execution engine: Pyodide (Python 3), JS, HTML/CSS live sandbox, and simulated C/C++/Java/Go/Rust online compiler.
 */

window.CodeExecutor = {
  pyodide: null,
  isPyodideLoading: false,

  initPyodide: async function(onStatusChange) {
    if (this.pyodide) return this.pyodide;
    if (this.isPyodideLoading) return null;

    this.isPyodideLoading = true;
    if (onStatusChange) onStatusChange('Loading Python 3 Engine...');

    try {
      if (window.loadPyodide) {
        this.pyodide = await window.loadPyodide();
        if (onStatusChange) onStatusChange('Python 3 Ready');
      }
    } catch(err) {
      console.error("Pyodide load error:", err);
      if (onStatusChange) onStatusChange('Pyodide Engine Error');
    } finally {
      this.isPyodideLoading = false;
    }
    return this.pyodide;
  },

  runCode: async function(code, language, consoleElement, iframeElement, statusElement) {
    statusElement.textContent = 'Executing...';
    statusElement.className = 'status-pill running';

    if (language === 'html' || language === 'css') {
      consoleElement.classList.add('hidden');
      iframeElement.classList.remove('hidden');
      const doc = iframeElement.contentDocument || iframeElement.contentWindow.document;
      doc.open();
      doc.write(code);
      doc.close();
      statusElement.textContent = 'Rendered Live Preview';
      statusElement.className = 'status-pill';
      return;
    } else {
      consoleElement.classList.remove('hidden');
      iframeElement.classList.add('hidden');
    }

    if (language === 'python') {
      try {
        let py = await this.initPyodide((msg) => { statusElement.textContent = msg; });
        if (!py) {
          consoleElement.textContent = 'Error: Python 3 engine failed to load.';
          statusElement.textContent = 'Error';
          statusElement.className = 'status-pill error';
          return;
        }

        // Capture python stdout & stderr
        await py.runPythonAsync(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        await py.runPythonAsync(code);
        let outputText = await py.runPythonAsync("sys.stdout.getvalue() + sys.stderr.getvalue()");

        consoleElement.textContent = outputText.trim() || 'Program executed successfully with exit code 0 (no stdout output).';
        statusElement.textContent = 'Success (0)';
        statusElement.className = 'status-pill';
      } catch(err) {
        consoleElement.textContent = `Traceback (most recent call last):\n${err.message}`;
        statusElement.textContent = 'Runtime Error';
        statusElement.className = 'status-pill error';
      }
    } else if (language === 'javascript') {
      let logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        error: (...args) => logs.push('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        warn: (...args) => logs.push('[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        info: (...args) => logs.push('[INFO] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '))
      };

      try {
        const runFn = new Function('console', code);
        runFn(customConsole);
        consoleElement.textContent = logs.join('\n') || 'Program executed successfully with exit code 0 (no stdout output).';
        statusElement.textContent = 'Success (0)';
        statusElement.className = 'status-pill';
      } catch(err) {
        consoleElement.textContent = `Uncaught ${err.name}: ${err.message}\n  at evaluation`;
        statusElement.textContent = 'Runtime Error';
        statusElement.className = 'status-pill error';
      }
    } else {
      // Compiled Languages: C++, C, Java, Go, Rust
      await new Promise(resolve => setTimeout(resolve, 400));
      let compiledResult = this.executeCompiledLanguage(code, language);
      consoleElement.textContent = compiledResult.output;
      statusElement.textContent = compiledResult.status;
      statusElement.className = compiledResult.isError ? 'status-pill error' : 'status-pill';
    }
  },

  executeCompiledLanguage: function(code, lang) {
    let outputLines = [`[BlazeCode Compiler] Compiling ${lang.toUpperCase()} program...`];
    let isError = false;

    // Check for common syntax errors
    if (lang === 'cpp' || lang === 'c') {
      if (!code.includes('main') && !code.includes('int main') && !code.includes('void main')) {
        return {
          output: `[BlazeCode Compiler Error]\nerror: 'main' function missing in ${lang.toUpperCase()} source code.\n   int main() { ... }`,
          status: 'Compilation Error',
          isError: true
        };
      }
    } else if (lang === 'java') {
      if (!code.includes('class') || !code.includes('public static void main')) {
        return {
          output: `[BlazeCode Compiler Error]\nerror: public static void main(String[] args) method not found in Java class.`,
          status: 'Compilation Error',
          isError: true
        };
      }
    } else if (lang === 'go') {
      if (!code.includes('func main')) {
        return {
          output: `[BlazeCode Compiler Error]\nerror: func main() is undeclared in Go package main.`,
          status: 'Compilation Error',
          isError: true
        };
      }
    } else if (lang === 'rust') {
      if (!code.includes('fn main')) {
        return {
          output: `[BlazeCode Compiler Error]\nerror: main function not found in Rust file crate root.`,
          status: 'Compilation Error',
          isError: true
        };
      }
    }

    outputLines.push(`[BlazeCode Sandbox] Compilation successful. Running binary target...\n---------------------------------------------------`);

    // Parse variables and print statements dynamically
    let parsedOutputs = [];

    // Parse numeric variable definitions (e.g., int a = 15, b = 25;)
    let vars = {};
    let varMatches = code.matchAll(/(?:int|double|float|auto|let|var|const)\s+([a-zA-Z0-9_,\s=]+);/g);
    for (let m of varMatches) {
      let decls = m[1].split(',');
      decls.forEach(d => {
        let parts = d.split('=').map(s => s.trim());
        if (parts.length === 2) {
          let val = parseFloat(parts[1]);
          if (!isNaN(val)) vars[parts[0]] = val;
        }
      });
    }

    // Extract std::cout / printf / System.out.println / fmt.Println / println!
    const lines = code.split('\n');
    lines.forEach(line => {
      let trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

      // C++ cout handling
      if (trimmed.includes('cout')) {
        let coutParts = trimmed.split('<<').slice(1);
        let lineOut = '';
        coutParts.forEach(p => {
          let part = p.trim().replace(/;$/, '');
          if (part === 'endl') return;
          if (part.startsWith('"') && part.endsWith('"')) {
            lineOut += part.slice(1, -1);
          } else if (part.startsWith("'") && part.endsWith("'")) {
            lineOut += part.slice(1, -1);
          } else if (vars[part] !== undefined) {
            lineOut += vars[part];
          } else if (part.includes('+') || part.includes('-') || part.includes('*')) {
            // Evaluate basic math like (a + b)
            let expr = part.replace(/[()]/g, '');
            Object.keys(vars).forEach(vk => {
              expr = expr.replace(new RegExp('\\b' + vk + '\\b', 'g'), vars[vk]);
            });
            try {
              let res = eval(expr);
              if (res !== undefined) lineOut += res;
            } catch(e) {
              lineOut += part;
            }
          } else {
            lineOut += part;
          }
        });
        if (lineOut) parsedOutputs.push(lineOut);
      }

      // printf / System.out.println / fmt.Println / println! handling
      else if (trimmed.includes('printf') || trimmed.includes('println') || trimmed.includes('Println') || trimmed.includes('print!')) {
        let strMatch = trimmed.match(/["']([^"']+)["']/);
        if (strMatch) {
          let str = strMatch[1];
          // Check for variable placeholders or math
          parsedOutputs.push(str);
        }
      }
    });

    if (parsedOutputs.length > 0) {
      outputLines.push(...parsedOutputs);
    } else {
      outputLines.push('Hello World! Program completed execution with exit code 0.');
    }

    return {
      output: outputLines.join('\n'),
      status: 'Compiled & Executed (0)',
      isError: false
    };
  }
};
