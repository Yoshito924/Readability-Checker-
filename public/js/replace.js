'use strict';

//入力されたテキストをサニタイジング(エスケープ処理)する関数
function Sanitizing(text) {
    text = text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n\n\n+/g, "<br \/><br \/>")
        .replace(/\n/g, "<br \/>");

    let after_text = text
    return after_text;
};


//---------------------------------------------------

//「画像のマークダウン記法」を「imgタグ」へ置換する処理をする関数
function MarkdownToImgReplace(text) {

    let input_width = Number(document.getElementById("input_width").value);

    text = text
        .replace(/\!\[.*?\]\((.*?)\)/g, `<img src="$1" width="${input_width}">`)

    return text;
};

//「画像のマークダウン記法」を「imgタグ」へ置換する関数
function MarkdownToImg() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = MarkdownToImgReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};

//---------------------------------------------------
//Wordpressのコードをマークダウン記法へ変換する処理をする関数
function ToMarkdownReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/<!-- .*code -->/g, '```')
        .replace(/<!--.*-->/g, '')

        .replace(/<h1>(.*)<\/h1>/g, '#$1')
        .replace(/<h2>(.*)<\/h2>/g, '##$1')
        .replace(/<h3>(.*)<\/h3>/g, '###$1')
        .replace(/<h4>(.*)<\/h4>/g, '####$1')
        .replace(/<h5>(.*)<\/h5>/g, '#####$1')
        .replace(/<h6>(.*)<\/h6>/g, '######$1')

        .replace(/<br>/g, '\n')

        .replace(/.class=\".*?\"/g, '')

        .replace(/\<a.*?href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')
        .replace(/\<a href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')

        .replace(/<figure>/g, '')
        .replace(/<\/figure>/g, '')

        .replace(/<span>/g, '')
        .replace(/<\/span>/g, '')

        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')

        .replace(/<b>/g, '**')
        .replace(/<\/b>/g, '**')

        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')

        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')

        .replace(/\*\*+/g, '**')

        .replace(/<hr\/>/g, '---')
        .replace(/<script src=".*?">/g, '')

        .replace(/\<script type=.*}..\<\/script\>/g, '$1')

        //両方リンクの場合
        .replace(/\[http.*?\]\((.*?)\)/g, '$1')

        .replace(/\*\*\[(.*?)\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')
        .replace(/\*\*\[\*\*(.*?)\*\*\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')

        .replace(/<\w*?>/g, '')
        .replace(/<\/\w*?>/g, '')

        .replace(/^・/g, '\- ')
        .replace(/\*\**/g, '**')

    return text;
};

//---------------------------------------------------
//Wordpressのコードをマークダウン記法へ変換する関数
function ToMarkdown() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = ToMarkdownReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};


//---------------------------------------------------

//英数字の全角括弧と日本語の半角括弧を矯正する処理をする関数
function KakkoReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/\（([0-9a-zA-Z])/g, '\($1')
        .replace(/([0-9a-zA-Z])\）/g, '$1\)')

        //日本語の半角括弧を全角括弧へ置換
        .replace(/\(([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])/g, '\（$1')
        .replace(/([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf])\)/g, '$1\）')

        .replace(/\（(.*?)\)/g, '\（$1）')
        .replace(/\((.*?)\）/g, '\($1)')

    return text;
};


//英数字の全角括弧と日本語の半角括弧を矯正する関数
function Kakko() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = KakkoReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};



//英数字の全角括弧と日本語の半角括弧を矯正する処理をする関数
function WordPressReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/<!-- .*code -->/g, '```')
        .replace(/<!--.*-->/g, '')

        .replace(/<h1>(.*)<\/h1>/g, '#$1')
        .replace(/<h2>(.*)<\/h2>/g, '##$1')
        .replace(/<h3>(.*)<\/h3>/g, '###$1')
        .replace(/<h4>(.*)<\/h4>/g, '####$1')
        .replace(/<h5>(.*)<\/h5>/g, '#####$1')
        .replace(/<h6>(.*)<\/h6>/g, '######$1')

    // .replace(/<br>/g, '\n')

    // .replace(/.class=\".*?\"/g, '')

    // .replace(/\<a.*?href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')
    // .replace(/\<a href=\"(http.*?)\".*?\>(.*?)<\/a>/g, '\[$2\]\($1\)')

    // .replace(/<figure>/g, '')
    // .replace(/<\/figure>/g, '')

    // .replace(/<span>/g, '')
    // .replace(/<\/span>/g, '')

    // .replace(/<strong>/g, '**')
    // .replace(/<\/strong>/g, '**')

    // .replace(/<b>/g, '**')
    // .replace(/<\/b>/g, '**')

    // .replace(/<p>/g, '')
    // .replace(/<\/p>/g, '')

    // .replace(/<em>/g, '')
    // .replace(/<\/em>/g, '')

    // .replace(/\*\*+/g, '**')

    // .replace(/<hr\/>/g, '---')
    // .replace(/<script src=".*?">/g, '')

    // .replace(/\<script type=.*}..\<\/script\>/g, '$1')

    // //両方リンクの場合
    // .replace(/\[http.*?\]\((.*?)\)/g, '$1')

    // .replace(/\*\*\[(.*?)\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')
    // .replace(/\*\*\[\*\*(.*?)\*\*\]\((.*?)\)\*\*/g, '\[\*\*$1\*\*\]\($2\)')

    // .replace(/<\w*?>/g, '')
    // .replace(/<\/\w*?>/g, '')

    // .replace(/^・/g, '\- ')
    // .replace(/\*\**/g, '**')

    return text;
};



function ToWordPress() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = WordPressReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};



//---------------------------------------------------
//自分用の処理をする関数
function MyReplace(text) {

    // リンクをmarkdown用に編集
    text = text
        //英数字の全角括弧を半角括弧へ置換する。
        .replace(/\<mark(.)\>.*?\<\/mark(.)\>/g, '\<mark\$1\>\$\<mark\$2\>')

    return text;
};


//自分用の関数
function MyTextReplace() {

    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;

    //使用に注意が必要な表現を着色する関数
    text = MyReplace(text);

    //入力されたテキストをサニタイジングする関数
    let after_text = Sanitizing(text);

    //表示ボックスに書き込む
    document.getElementById("box").innerHTML = after_text;
};


//---------------------------------------------------

function ExampleTextMarkdownToImg() {
    document.getElementById("textarea").innerHTML
        = "![画像タイトル](画像のURL)";
    ButtonInvisible();
    MarkdownToImg();
};

//サンプルを入力するボタンを出現させる関数
function ExampleTextButtonAppearanceMarkdownToImg() {
    document.getElementById("ExampleTextButton").innerHTML
        = `<a class= "c-button pb-2 m-1" onclick="ExampleTextMarkdownToImg()">サンプルを入力する</a> `
};


//---------------------------------------------------
function ExampleTextKakko() {
    document.getElementById("textarea").innerHTML
        = "朝食(パン)を食べました。";
    ButtonInvisible();
    Kakko();
};

//サンプルを入力するボタンを出現させる関数
function ExampleTextButtonAppearanceKakko() {
    document.getElementById("ExampleTextButton").innerHTML
        = `<a class= "c-button pb-2 m-1" onclick="ExampleTextKakko()">例文を入力する</a> `
};

//---------------------------------------------------
//サンプルを入力するボタンを見えなくする関数
function ButtonInvisible() {
    //テキストエリア内のテキストを取得
    let text = document.getElementById("textarea").value;
    text = Sanitizing(text);
    let TextLength = text.replace(/<br \/>/g, '').length;

    if (TextLength === 0) {
        document.getElementById("textarea").innerHTML = '';
    } else if (TextLength > 1) {
        document.getElementById("ExampleTextButton").innerHTML = ""
    };
};



