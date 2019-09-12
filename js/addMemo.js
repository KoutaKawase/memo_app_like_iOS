(() => {
    'use strict';

    let wordArea = document.getElementById('word');
    let contentArea = document.getElementById('content');
    let saveButton = document.getElementById('save');
    let clearButton = document.getElementById('clear');
    let memoTitle = wordArea.value;
    let memoContent = contentArea.value;
    let saveInfoArea = document.getElementById('save-info-area');

    //クエリ文字列を取得
    const getKey = () => {
        //?を削除して[key, value]の形にする
        let queryArray = window.location.search.slice(1).split('=');
        //keyを取得(日本語のためにデコード)
        let key = decodeURI(queryArray[1]);
        return key;
    };

    const isThereQuery = () => {
        if (window.location.search) {
            return true;
        }
        return false;
    }

    window.onload = () => {
        //クエリがある場合のみ実行
        if (isThereQuery()) {
            //ローカルストレージからkeyを元に取得
            let key = getKey();
            let parseData = JSON.parse(localStorage.getItem(key));
            wordArea.value = key;
            contentArea.value = parseData;
        }
    };

    const getMemo = () => {
        //インプットとテキストエリアから内容を取得
        memoTitle = wordArea.value;
        memoContent = contentArea.value;
        const memo = {
            title: memoTitle,
            content: memoContent
        };
        return memo;
    };

    const sendStorage = () => {
        //メモ内容を取得
        const memo = getMemo();
        console.log(memo);
        localStorage.setItem(memo.title, JSON.stringify(memo.content));
        saveInfoArea.textContent = "保存に成功しました！";
    };

    const removeMemo = () => {
        wordArea.value = '';
        contentArea.value = '';
        //クエリがある場合のみローカルストレージを操作
        if (isThereQuery()) {
            let key = getKey();
            localStorage.removeItem(key);
        }
    }

    saveButton.addEventListener('click', sendStorage);
    clearButton.addEventListener('click', removeMemo);
})();