document.addEventListener('DOMContentLoaded', function () {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return; // スイッチがないページでは何もしない

    const switchContainer = document.querySelector('.lang-switch-container');
    if (!switchContainer) return; // コンテナがないページでは何もしない

    const currentPageLang = switchContainer.dataset.currentLang;

    // --- 1. ページ読み込み時の言語チェックとリダイレクト ---
    const savedLang = localStorage.getItem('language') || 'jp';

    if (savedLang !== currentPageLang) {
        const currentPath = window.location.pathname.split('/').pop();
        let targetFile;

        if (savedLang === 'en' && !currentPath.includes('-en.html')) {
            // 英語ページに飛ばす（ただし、すでに英語ページでない場合のみ）
            targetFile = currentPath.replace('.html', '-en.html');
        } else if (savedLang === 'jp' && currentPath.includes('-en.html')) {
            // 日本語ページに飛ばす（ただし、すでに日本語ページでない場合のみ）
            targetFile = currentPath.replace('-en.html', '.html');
        }

        if (targetFile) {
            window.location.href = targetFile;
            return;
        }
    }

    // --- 2. スイッチの見た目を現在の言語に合わせる ---
    langToggle.checked = (savedLang === 'en');

    // --- 3. ページ内のリンク先を現在の言語に合わせる ---
    const navLinks = document.querySelectorAll('a[data-lang-href]');
    navLinks.forEach(link => {
        const baseHref = link.dataset.langHref;
        if (savedLang === 'en') {
            link.href = `${baseHref}-en.html`;
        } else {
            link.href = `${baseHref}.html`;
        }
    });

    // --- 4. スイッチが操作された時のイベント ---
    langToggle.addEventListener('change', function() {
        const targetLang = this.checked ? 'en' : 'jp';
        localStorage.setItem('language', targetLang);

        const currentPath = window.location.pathname.split('/').pop();
        let targetFile;

        if (targetLang === 'en') {
            targetFile = currentPath.replace('-en.html', '').replace('.html', '-en.html');
        } else {
            targetFile = currentPath.replace('-en.html', '.html');
        }
        
        window.location.href = targetFile;
    });
});