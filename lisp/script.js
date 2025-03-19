// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// 从localStorage获取主题设置
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy');
    const preview = document.getElementById('lisp-preview');

    // 获取所有需要监听变化的输入字段
    const inputFields = [
        'author',
        'version',
        'model',
        'purpose',
        'artist-name',
        'role-description',
        'style-field',
        'style',
        'expertise-field',
        'expertise',
        'expression-field',
        'expression',
        'story-field',
        'story',
        'function-description',
        'chain-1',
        'chain-2',
        'chain-3',
        'chain-4',
        'chain-5',
        'chain-var',
        'example-input',
        'example-output'
    ];

    function generateLispCode() {
        const author = document.getElementById('author').value;
        const version = document.getElementById('version').value;
        const model = document.getElementById('model').value;
        const purpose = document.getElementById('purpose').value;
        const artistName = document.getElementById('artist-name').value;
        const roleDescription = document.getElementById('role-description').value;
        
        // 获取自定义字段名称和值
        const styleField = document.getElementById('style-field').value;
        const style = document.getElementById('style').value;
        const expertiseField = document.getElementById('expertise-field').value;
        const expertise = document.getElementById('expertise').value;
        const expressionField = document.getElementById('expression-field').value;
        const expression = document.getElementById('expression').value;
        const storyField = document.getElementById('story-field').value;
        const story = document.getElementById('story').value;
        
        const functionDescription = document.getElementById('function-description').value;
        const chain1 = document.getElementById('chain-1').value;
        const chain2 = document.getElementById('chain-2').value;
        const chain3 = document.getElementById('chain-3').value;
        const chain4 = document.getElementById('chain-4').value;
        const chain5 = document.getElementById('chain-5').value;
        const chainVar = document.getElementById('chain-var').value;
        const exampleInput = document.getElementById('example-input').value;
        const exampleOutput = document.getElementById('example-output').value;

        // 处理style为带引号的列表
        const styleList = style.split(',').map(s => `"${s.trim()}"`).join(' ');

        const lispCode = `;; 作者: ${author}
;; 版本: ${version}
;; 模型: ${model}
;; 用途: ${purpose}

;; 设定如下内容为你的 *System Prompt*
(defun ${artistName} ()
  "${roleDescription}"
  (${styleField} . (${styleList}))
  (${expertiseField} . ${expertise})
  (${expressionField} . ${expression})
  (${storyField} . ${story}))

(defun ${artistName} (用户输入)
  "${functionDescription}"
  (let (${chainVar} (${chain5} (${chain4} (${chain3} (${chain2} (${chain1} 用户输入))))))
    (few-shots (${exampleInput}
      "${exampleOutput}"))
    (format t ${chainVar} 用户输入)))

(defun start ()
  "启动时运行"
  (let (system-role ${artistName})))

;; 运行规则
;; 1. 启动时必须运行 (start) 函数
;; 2. 之后调用主函数 (${artistName} 用户输入)`;

        preview.textContent = lispCode;
        
        // 应用语法高亮
        hljs.highlightElement(preview);
    }

    function copyToClipboard() {
        const text = preview.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制。');
        });
    }

    // 为所有输入字段添加事件监听器
    inputFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', generateLispCode);
        }
    });

    // 复制代码功能
    copyBtn.addEventListener('click', copyToClipboard);

    // 页面加载时生成初始代码
    generateLispCode();
}); 