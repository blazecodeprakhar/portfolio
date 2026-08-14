/**
 * BlazeCode Studio Main Application Controller
 * Professional VS Code 3-Panel IDE with Inline Sidebar File Creation & Renaming, Dual Window Resizers, Right-Click Context Menu, and Language Auto-Detection
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const codeEditorEl = document.getElementById('codeEditor');
  const fileTreeList = document.getElementById('fileTreeList');
  const fileExplorerSection = document.getElementById('fileExplorerSection');
  const editorTabsBar = document.getElementById('editorTabsBar');
  const activeFileTitle = document.getElementById('activeFileTitle');
  const detectedLangIcon = document.getElementById('detectedLangIcon');
  const detectedLangName = document.getElementById('detectedLangName');
  const cursorPos = document.getElementById('cursorPos');
  const runCodeBtn = document.getElementById('runCodeBtn');
  const clearEditorBtn = document.getElementById('clearEditorBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const clearOutputBtn = document.getElementById('clearOutputBtn');
  const closeOutputBtn = document.getElementById('closeOutputBtn');
  const reopenOutputBtn = document.getElementById('reopenOutputBtn');
  const outputConsole = document.getElementById('outputConsole');
  const webPreviewFrame = document.getElementById('webPreviewFrame');
  const executionStatus = document.getElementById('executionStatus');
  const addNewFileBtn = document.getElementById('addNewFileBtn');
  const themeSelect = document.getElementById('themeSelect');
  const outputContainer = document.getElementById('outputContainer');
  const resizer = document.getElementById('resizer');
  const sidebarResizer = document.getElementById('sidebarResizer');
  const vscodeSidebar = document.getElementById('vscodeSidebar');
  const editorContainer = document.getElementById('editorContainer');

  // Context Menu Elements
  const fileContextMenu = document.getElementById('fileContextMenu');
  const ctxOpen = document.getElementById('ctxOpen');
  const ctxRename = document.getElementById('ctxRename');
  const ctxDuplicate = document.getElementById('ctxDuplicate');
  const ctxNewFile = document.getElementById('ctxNewFile');
  const ctxDelete = document.getElementById('ctxDelete');

  // AI Elements
  const aiPromptInput = document.getElementById('aiPromptInput');
  const aiGenerateBtn = document.getElementById('aiGenerateBtn');
  const aiStatus = document.getElementById('aiStatus');

  // Extension to Language Mapping Database
  const extensionDB = {
    py: { lang: 'python', name: 'Python 3', mode: 'python', icon: 'fa-brands fa-python' },
    js: { lang: 'javascript', name: 'JavaScript', mode: 'javascript', icon: 'fa-brands fa-js' },
    html: { lang: 'html', name: 'HTML5 Web', mode: 'htmlmixed', icon: 'fa-brands fa-html5' },
    css: { lang: 'html', name: 'CSS Styling', mode: 'css', icon: 'fa-brands fa-css3-alt' },
    cpp: { lang: 'cpp', name: 'C++ (GCC)', mode: 'text/x-c++src', icon: 'fa-solid fa-code' },
    c: { lang: 'c', name: 'C (GCC)', mode: 'text/x-csrc', icon: 'fa-solid fa-c' },
    java: { lang: 'java', name: 'Java 17', mode: 'text/x-java', icon: 'fa-brands fa-java' },
    go: { lang: 'go', name: 'Go', mode: 'go', icon: 'fa-solid fa-code' },
    rs: { lang: 'rust', name: 'Rust', mode: 'rust', icon: 'fa-solid fa-gear' }
  };

  // Helper to determine icon from filename
  function getIconForFilename(filename) {
    let parts = filename.trim().split('.');
    let ext = parts.length > 1 ? parts.pop().toLowerCase() : '';
    let config = extensionDB[ext] || { icon: 'fa-solid fa-file-code' };
    return config.icon;
  }

  // Initial Project Files State
  let projectFiles = [
    {
      id: 'f1',
      name: 'main.py',
      ext: 'py',
      lang: 'python',
      mode: 'python',
      icon: 'fa-brands fa-python',
      displayName: 'Python 3',
      content: `# BlazeCode Studio - Python 3\n\ndef main():\n    print("Hello from BlazeCode Studio!")\n    numbers = [1, 2, 3, 4, 5]\n    squared = [x**2 for x in numbers]\n    print("Squared:", squared)\n\nif __name__ == "__main__":\n    main()\n`
    },
    {
      id: 'f2',
      name: 'code.cpp',
      ext: 'cpp',
      lang: 'cpp',
      mode: 'text/x-c++src',
      icon: 'fa-solid fa-code',
      displayName: 'C++ (GCC)',
      content: `// BlazeCode Studio - C++ (GCC)\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++ in BlazeCode Studio!" << endl;\n    int a = 15, b = 25;\n    cout << "Sum = " << (a + b) << endl;\n    return 0;\n}\n`
    },
    {
      id: 'f3',
      name: 'index.html',
      ext: 'html',
      lang: 'html',
      mode: 'htmlmixed',
      icon: 'fa-brands fa-html5',
      displayName: 'HTML5 Web',
      content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>BlazeCode Web Preview</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #0d1117; color: #58a6ff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }\n    h1 { font-size: 2.2rem; margin-bottom: 0.5rem; text-shadow: 0 0 20px rgba(88,166,255,0.4); }\n    p { color: #8b949e; }\n    .box { background: #161b22; padding: 2rem; border-radius: 12px; border: 1px solid #30363d; text-align: center; }\n  </style>\n</head>\n<body>\n  <div class="box">\n    <h1>⚡ BlazeCode Web</h1>\n    <p>Live Web & HTML5 Interactive Sandbox</p>\n  </div>\n</body>\n</html>\n`
    },
    {
      id: 'f4',
      name: 'script.js',
      ext: 'js',
      lang: 'javascript',
      mode: 'javascript',
      icon: 'fa-brands fa-js',
      displayName: 'JavaScript',
      content: `// BlazeCode Studio - JavaScript (Node/Web)\n\nfunction greet(name) {\n  console.log(\`Hello \${name}! Welcome to BlazeCode Studio.\`);\n}\n\ngreet("Developer");\nconst items = [10, 20, 30];\nconsole.log("Sum:", items.reduce((a, b) => a + b, 0));\n`
    },
    {
      id: 'f5',
      name: 'style.css',
      ext: 'css',
      lang: 'html',
      mode: 'css',
      icon: 'fa-brands fa-css3-alt',
      displayName: 'CSS Styling',
      content: `/* BlazeCode Studio - CSS Styling */\nbody {\n    background-color: #0f172a;\n    color: #38bdf8;\n    font-family: system-ui, sans-serif;\n    padding: 20px;\n}\n.card {\n    border: 1px solid rgba(255,255,255,0.1);\n    border-radius: 12px;\n    padding: 24px;\n}\n`
    },
    {
      id: 'f6',
      name: 'Main.java',
      ext: 'java',
      lang: 'java',
      mode: 'text/x-java',
      icon: 'fa-brands fa-java',
      displayName: 'Java 17',
      content: `// BlazeCode Studio - Java 17\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World from Java!");\n    }\n}\n`
    }
  ];

  let activeFileId = 'f1';
  let openTabIds = ['f1', 'f2', 'f3'];
  let contextTargetFileId = null;
  let isCreatingFile = false;
  let renamingFileId = null;

  // Initialize CodeMirror Editor
  const editor = CodeMirror.fromTextArea(codeEditorEl, {
    mode: 'python',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true
  });

  // Track editor changes back to active file object
  editor.on('change', () => {
    const activeFile = getActiveFile();
    if (activeFile) {
      activeFile.content = editor.getValue();
    }
  });

  // Update cursor position tracking
  editor.on('cursorActivity', () => {
    const cursor = editor.getCursor();
    cursorPos.textContent = `Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;
  });

  function getActiveFile() {
    return projectFiles.find(f => f.id === activeFileId);
  }

  // Switch Active File
  function switchToFile(fileId) {
    const activeFile = getActiveFile();
    if (activeFile) {
      activeFile.content = editor.getValue();
    }

    activeFileId = fileId;
    if (!openTabIds.includes(fileId)) {
      openTabIds.push(fileId);
    }

    const newActiveFile = getActiveFile();
    if (!newActiveFile) return;

    // Load file content into editor
    editor.setValue(newActiveFile.content);
    editor.setOption('mode', newActiveFile.mode);

    // Update section title & status pill
    activeFileTitle.innerHTML = `<i class="${newActiveFile.icon}"></i> ${newActiveFile.name}`;
    detectedLangIcon.className = `${newActiveFile.icon}`;
    detectedLangName.textContent = newActiveFile.displayName;

    renderFileTree();
    renderEditorTabs();
    showToast(`Opened ${newActiveFile.name}`);
  }

  // Render Sidebar File Explorer Tree (VS Code Inline Editing)
  function renderFileTree() {
    fileTreeList.innerHTML = '';

    // If currently creating a file, insert active inline input row at top of tree
    if (isCreatingFile) {
      const newRow = document.createElement('div');
      newRow.className = 'file-item active';
      newRow.innerHTML = `
        <i class="fa-brands fa-python" id="newInlineFileIcon" style="color:var(--accent-purple);"></i>
        <input type="text" id="inlineNewFileInput" class="inline-file-input" value="untitled.py" placeholder="filename.ext" />
      `;
      fileTreeList.appendChild(newRow);

      setTimeout(() => {
        const inputEl = document.getElementById('inlineNewFileInput');
        const iconEl = document.getElementById('newInlineFileIcon');

        if (inputEl) {
          inputEl.focus();
          inputEl.select();

          // Dynamic icon update while typing
          inputEl.addEventListener('input', () => {
            if (iconEl) {
              iconEl.className = getIconForFilename(inputEl.value);
            }
          });

          let committed = false;
          const commitNewFile = () => {
            if (committed || !isCreatingFile) return;
            committed = true;
            const val = inputEl.value.trim();
            isCreatingFile = false;
            if (val) {
              saveNewFile(val);
            } else {
              renderFileTree();
            }
          };

          inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              commitNewFile();
            } else if (e.key === 'Escape') {
              isCreatingFile = false;
              renderFileTree();
            }
          });

          inputEl.addEventListener('blur', commitNewFile);
        }
      }, 50);
    }

    projectFiles.forEach(file => {
      const item = document.createElement('div');
      item.className = `file-item ${file.id === activeFileId ? 'active' : ''}`;

      if (renamingFileId === file.id) {
        item.innerHTML = `
          <i class="${file.icon}"></i>
          <input type="text" id="renameInlineFileInput" class="rename-file-input" value="${file.name}" />
        `;
        setTimeout(() => {
          const inputEl = document.getElementById('renameInlineFileInput');
          if (inputEl) {
            inputEl.focus();
            inputEl.select();

            let committed = false;
            const commitRename = () => {
              if (committed || renamingFileId !== file.id) return;
              committed = true;
              const val = inputEl.value.trim();
              renamingFileId = null;
              if (val && val !== file.name) {
                applyFileRename(file.id, val);
              } else {
                renderFileTree();
              }
            };

            inputEl.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') commitRename();
              else if (e.key === 'Escape') {
                renamingFileId = null;
                renderFileTree();
              }
            });

            inputEl.addEventListener('blur', commitRename);
          }
        }, 50);
      } else {
        item.innerHTML = `
          <i class="${file.icon}"></i>
          <span class="file-name">${file.name}</span>
        `;

        // Left Click: Switch File
        item.addEventListener('click', () => {
          switchToFile(file.id);
        });

        // Right Click Context Menu Handler
        item.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          contextTargetFileId = file.id;
          showContextMenu(e.clientX, e.clientY);
        });
      }

      fileTreeList.appendChild(item);
    });
  }

  // Right Click inside empty file explorer container
  fileExplorerSection.addEventListener('contextmenu', (e) => {
    if (!e.target.closest('.file-item')) {
      e.preventDefault();
      contextTargetFileId = activeFileId;
      showContextMenu(e.clientX, e.clientY);
    }
  });

  // Display Custom Context Menu
  function showContextMenu(x, y) {
    fileContextMenu.style.left = `${x}px`;
    fileContextMenu.style.top = `${y}px`;
    fileContextMenu.classList.remove('hidden');
  }

  // Hide Context Menu
  function hideContextMenu() {
    fileContextMenu.classList.add('hidden');
  }

  document.addEventListener('click', hideContextMenu);

  // Context Menu Actions
  ctxOpen.addEventListener('click', () => {
    if (contextTargetFileId) switchToFile(contextTargetFileId);
    hideContextMenu();
  });

  ctxRename.addEventListener('click', () => {
    if (contextTargetFileId) startRenameFile(contextTargetFileId);
    hideContextMenu();
  });

  ctxDuplicate.addEventListener('click', () => {
    if (contextTargetFileId) duplicateFile(contextTargetFileId);
    hideContextMenu();
  });

  ctxNewFile.addEventListener('click', () => {
    hideContextMenu();
    triggerInlineNewFile();
  });

  ctxDelete.addEventListener('click', () => {
    if (contextTargetFileId) deleteFile(contextTargetFileId);
    hideContextMenu();
  });

  // Start Rename File Function
  function startRenameFile(fileId) {
    renamingFileId = fileId;
    renderFileTree();
  }

  function applyFileRename(fileId, newName) {
    const file = projectFiles.find(f => f.id === fileId);
    if (!file) return;

    let cleanName = newName.trim();
    let parts = cleanName.split('.');
    let ext = parts.length > 1 ? parts.pop().toLowerCase() : 'py';
    let config = extensionDB[ext] || extensionDB.py;

    file.name = cleanName;
    file.ext = ext;
    file.lang = config.lang;
    file.mode = config.mode;
    file.icon = config.icon;
    file.displayName = config.name;

    if (activeFileId === fileId) {
      editor.setOption('mode', file.mode);
      activeFileTitle.innerHTML = `<i class="${file.icon}"></i> ${file.name}`;
      detectedLangIcon.className = `${file.icon}`;
      detectedLangName.textContent = file.displayName;
    }

    renderFileTree();
    renderEditorTabs();
    showToast(`Renamed file to ${cleanName}`);
  }

  // Duplicate File Function
  function duplicateFile(fileId) {
    const file = projectFiles.find(f => f.id === fileId);
    if (!file) return;

    let parts = file.name.split('.');
    let ext = parts.length > 1 ? parts.pop() : 'py';
    let base = parts.join('.');

    let copyName = `${base}_copy.${ext}`;
    let config = extensionDB[ext] || extensionDB.py;

    let newId = 'f_' + Date.now();
    let dupFile = {
      id: newId,
      name: copyName,
      ext: ext,
      lang: config.lang,
      mode: config.mode,
      icon: config.icon,
      displayName: config.name,
      content: file.content
    };

    projectFiles.push(dupFile);
    switchToFile(newId);
    showToast(`Duplicated ${copyName}`);
  }

  // Render Editor Top Tabs
  function renderEditorTabs() {
    editorTabsBar.innerHTML = '';
    openTabIds.forEach(tabId => {
      const file = projectFiles.find(f => f.id === tabId);
      if (!file) return;

      const tab = document.createElement('div');
      tab.className = `editor-tab ${tabId === activeFileId ? 'active' : ''}`;
      tab.innerHTML = `
        <i class="${file.icon}"></i>
        <span>${file.name}</span>
        ${openTabIds.length > 1 ? `<button class="close-tab-btn" data-id="${file.id}">&times;</button>` : ''}
      `;

      tab.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-tab-btn')) {
          e.stopPropagation();
          closeTab(file.id);
        } else {
          switchToFile(file.id);
        }
      });

      // Context menu on tab
      tab.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextTargetFileId = file.id;
        showContextMenu(e.clientX, e.clientY);
      });

      editorTabsBar.appendChild(tab);
    });
  }

  // Close Editor Tab
  function closeTab(fileId) {
    openTabIds = openTabIds.filter(id => id !== fileId);
    if (activeFileId === fileId) {
      if (openTabIds.length > 0) {
        switchToFile(openTabIds[openTabIds.length - 1]);
      }
    } else {
      renderEditorTabs();
    }
  }

  // Delete File
  function deleteFile(fileId) {
    if (projectFiles.length <= 1) {
      showToast('Cannot delete the last remaining file');
      return;
    }

    const file = projectFiles.find(f => f.id === fileId);
    const fname = file ? file.name : 'File';

    projectFiles = projectFiles.filter(f => f.id !== fileId);
    openTabIds = openTabIds.filter(id => id !== fileId);

    if (activeFileId === fileId) {
      switchToFile(projectFiles[0].id);
    } else {
      renderFileTree();
      renderEditorTabs();
    }
    showToast(`Deleted ${fname}`);
  }

  // VS CODE INLINE FILE CREATION TRIGGER
  function triggerInlineNewFile() {
    isCreatingFile = true;
    renderFileTree();
  }

  if (addNewFileBtn) {
    addNewFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerInlineNewFile();
    });
  }

  function saveNewFile(filename) {
    let cleanName = filename.trim();
    let parts = cleanName.split('.');
    let ext = parts.length > 1 ? parts.pop().toLowerCase() : 'py';
    let config = extensionDB[ext] || extensionDB.py;

    let newId = 'f_' + Date.now();
    let newFile = {
      id: newId,
      name: cleanName,
      ext: ext,
      lang: config.lang,
      mode: config.mode,
      icon: config.icon,
      displayName: config.name,
      content: `// ${cleanName} created in BlazeCode Studio\n`
    };

    projectFiles.push(newFile);
    switchToFile(newId);
    showToast(`Created ${cleanName}`);
  }

  // Run Code Action
  runCodeBtn.addEventListener('click', () => {
    if (outputContainer.classList.contains('hidden')) {
      openOutputPanel();
    }

    const activeFile = getActiveFile();
    if (!activeFile) return;

    window.CodeExecutor.runCode(activeFile.content, activeFile.lang, outputConsole, webPreviewFrame, executionStatus);
  });

  // Keyboard shortcut Ctrl + Enter to run
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCodeBtn.click();
    }
  });

  // Output Close & Re-open logic
  closeOutputBtn.addEventListener('click', closeOutputPanel);
  reopenOutputBtn.addEventListener('click', openOutputPanel);

  function closeOutputPanel() {
    outputContainer.classList.add('hidden');
    resizer.classList.add('hidden');
    reopenOutputBtn.classList.remove('hidden');
    editorContainer.style.width = '100%';
    showToast('Output panel collapsed');
    setTimeout(() => editor.refresh(), 50);
  }

  function openOutputPanel() {
    outputContainer.classList.remove('hidden');
    resizer.classList.remove('hidden');
    reopenOutputBtn.classList.add('hidden');
    editorContainer.style.width = '68%';
    setTimeout(() => editor.refresh(), 50);
  }

  // Clear Editor
  clearEditorBtn.addEventListener('click', () => {
    editor.setValue('');
    editor.focus();
    showToast('Code editor cleared');
  });

  // Copy Code
  copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(editor.getValue());
    showToast('Code copied to clipboard!');
  });

  // Clear Output
  clearOutputBtn.addEventListener('click', () => {
    outputConsole.textContent = 'Output cleared.';
    executionStatus.textContent = 'Ready';
    executionStatus.className = 'status-pill';
    showToast('Console output cleared');
  });

  // AI Prompt Generation
  async function triggerAIGeneration() {
    const prompt = aiPromptInput.value.trim();
    if (!prompt) return;

    const activeFile = getActiveFile();
    if (aiStatus) {
      aiStatus.textContent = '⚡ Synthesizing Code...';
      aiStatus.style.color = '#BD4FF4';
    }

    try {
      const generatedCode = await window.AIEngine.generateCode(prompt, activeFile ? activeFile.lang : 'python');
      editor.setValue(generatedCode);
      if (aiStatus) {
        aiStatus.textContent = 'Code Synthesized!';
        aiStatus.style.color = '#10b981';
      }
      showToast('AI Code synthesized!');
    } catch(err) {
      if (aiStatus) {
        aiStatus.textContent = 'Generation Failed';
        aiStatus.style.color = '#ef4444';
      }
      showToast('Code Generation failed');
    } finally {
      if (aiStatus) {
        setTimeout(() => {
          aiStatus.textContent = '';
        }, 3000);
      }
    }
  }

  aiGenerateBtn.addEventListener('click', triggerAIGeneration);
  aiPromptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      triggerAIGeneration();
    }
  });

  // Theme Change Listener
  themeSelect.addEventListener('change', (e) => {
    const theme = e.target.value;
    document.documentElement.setAttribute('data-theme', theme);
    editor.setOption('theme', theme === 'dark' ? 'dracula' : 'eclipse');
    showToast(`Switched to ${theme} theme`);
  });

  // DUAL RESIZERS (SIDEBAR & OUTPUT CONSOLE)
  let isDraggingSidebar = false;
  let isDraggingOutput = false;

  if (sidebarResizer && vscodeSidebar) {
    sidebarResizer.addEventListener('mousedown', (e) => {
      isDraggingSidebar = true;
      sidebarResizer.classList.add('dragging');
      document.body.classList.add('is-resizing');
      e.preventDefault();
    });
  }

  if (resizer && outputContainer) {
    resizer.addEventListener('mousedown', (e) => {
      isDraggingOutput = true;
      resizer.classList.add('dragging');
      document.body.classList.add('is-resizing');
      e.preventDefault();
    });
  }

  document.addEventListener('mousemove', (e) => {
    if (isDraggingSidebar && vscodeSidebar) {
      const newSidebarWidth = e.clientX;
      if (newSidebarWidth >= 160 && newSidebarWidth <= 450) {
        vscodeSidebar.style.width = `${newSidebarWidth}px`;
        editor.refresh();
      }
    } else if (isDraggingOutput && outputContainer) {
      const workspaceWidth = document.querySelector('.workspace-panel').offsetWidth;
      const rightOffset = workspaceWidth - e.clientX;
      if (rightOffset >= 180 && rightOffset <= (workspaceWidth - 280)) {
        outputContainer.style.width = `${rightOffset}px`;
        editor.refresh();
      }
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDraggingSidebar) {
      isDraggingSidebar = false;
      if (sidebarResizer) sidebarResizer.classList.remove('dragging');
      document.body.classList.remove('is-resizing');
      editor.refresh();
    }
    if (isDraggingOutput) {
      isDraggingOutput = false;
      if (resizer) resizer.classList.remove('dragging');
      document.body.classList.remove('is-resizing');
      editor.refresh();
    }
  });

  // Toast Helper
  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#BD4FF4;"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Initialize
  switchToFile('f1');
});
