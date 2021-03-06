
//ヘッダーのコンポーネントを定義---------------------------------

Vue.component('header-template', {
  template: `
      <div>
      <nav class="navbar navbar-expand-xxl navbar-dark fixed-top bg-dark">
      <div class="container-fluid">

      <a class="navbar-brand text-white" href="index.html">①読みやすさチェッカー</a>

      <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li>
            <a class="nav-link" href="free-conversion.html">②一気に置換</span></a>
          </li>
          <li>
            <a class="nav-link" href="case.html">③アルファベット</span></a>
          </li>
          <li>
            <a class="nav-link" href="kakko.html">④括弧矯正</span></a>
          </li>
          <li>
            <a class="nav-link" href="hyphen.html">⑤ハイフン統一</span></a>
          </li>
          <li>
          <li>
            <a class="nav-link" href="https://yoshito.khufrudamonotes.com/"target="_blank" rel="noopener noreferrer">【開発者について】</span></a>
          </li>
      </div>

      </div>
      </nav>
      </div>
      `
})

//ヘッダーのコンポーネントのインスタンスを作成する
const headerTemplate = new Vue({
  el: '#header'
})

//右カラム部分のコンポーネントを定義---------------------------------

Vue.component('right-column', {
  template: `
      <div>

        <div class="Larger shadow p-3 rounded pb-2 m-3">
          <h5>作ったテキスト系ツールの一覧</h5>
        </div>

        <ul>
          <li>
            <a class="nav-link" href="index.html">①読みやすさチェッカー</span></a>
          </li>
          <li>
          　<a class="nav-link" href="free-conversion.html">②任意の文字列を一気に置換するツール</span></a>
          </li>
          <li>
          　<a class="nav-link" href="case.html">③アルファベットを「大文字・小文字・任意のcaseスタイル」へ置換するツール</span></a>
          </li>
          <li>
            <a class="nav-link" href="kakko.html">④「英数字の全角括弧」と「日本語の半角括弧」を置換して矯正するツール</span></a>
          </li>
          <li>
            <a class="nav-link" href="hyphen.html">⑤「ハイフンっぽい横棒」を統一するツール</span></a>
          </li>
          <li>
            <a class="nav-link" href="markdown-to-img.html">⑥「画像のマークダウン記法」を「imgタグ」へ置換するツール</span></a>
          </li>
          <li>
            <a class="nav-link" href="to-markdown.html">⑦「Wordpressのコード」を「マークダウン記法」に置換するツール</span></a>
          </li>
        </ul>

        <div class="Larger shadow p-3 rounded pb-2 m-3">
          <h5>関連ページへのリンク</h5>
        </div>

        <ul>
          <li>
            <a class="nav-link" href="https://yoshito.khufrudamonotes.com/"target="_blank" rel="noopener noreferrer">開発者について</span></a>
          </li>
          <li>
            <a class="nav-link" href="https://github.com/Yoshito924/Readability-Checker-"target="_blank" rel="noopener noreferrer">GitHub</span></a>
          </li>
          <li>
            <a class="nav-link" href="https://o-to.khufrudamonotes.com"target="_blank" rel="noopener noreferrer">O-TO【音楽理論ウェブアプリ】</span></a>
          </li>
          <li>
            <a class="nav-link" href="https://khufrudamonotes.com/contact-english"target="_blank" rel="noopener noreferrer">バグの報告やフィードバックはこちらから。</span></a>
          </li>
        </ul>

        <div class="Larger shadow p-3 rounded pb-2 m-3">
          <h5>サポートのお願い</h5>
        </div>

          <p>継続的なサイト運営、コンテンツ制作のためにあなたのサポートが必要です。</p>

          <p><a href="https://www.paypal.com/paypalme/KHUFRUDAMONOTES/1000JPY" target="_blank"
              rel="noreferrer noopener"><strong>PayPal.Me</strong></a>及び<a href="https://buy.stripe.com/9AQdTx6y006YbDy001"
              target="_blank" rel="noreferrer noopener"><strong>stripe</strong></a>からサポートをお願いいたします。</p>

          <ul>
            <li><a href="https://www.paypal.com/paypalme/KHUFRUDAMONOTES/1000JPY" target="_blank"
                rel="noreferrer noopener">PayPal.Meの決済リンク</a>
            </li>
            <li><a href="https://buy.stripe.com/9AQdTx6y006YbDy001" target="_blank"
                rel="noreferrer noopener">stripeの決済リンク</a>
            </li>
          </ul>

          <p class="has-small-font-size">
            ※リンク先へ飛んだだけでは決済は行われません。
          </p>

          <p class="has-small-font-size">
            ※PayPal.Meは<a href="https://www.paypal.com/paypalme/KHUFRUDAMONOTES/1000JPY" target="_blank"
              rel="noreferrer noopener">リンク先</a>へアクセスし、「送信」を選択してください。
          </p>

          <p>いつもありがとうございます。</p>

          <p style="text-align: left" class="py-2  pb-3">
            開発者：<a href="https://yoshito.khufrudamonotes.com/" target="_blank"
              rel="noreferrer noopener">キムラヨシト</a>(KHUFRUDAMO NOTES)
          </p>
      </div>
        `
})

//右カラム部分のコンポーネントのインスタンスを作成する
const rightColumn = new Vue({
  el: '#right-column'
})


//フッター部分のコンポーネントを定義---------------------------------

Vue.component('copyright-text', {
  template: `
      <div>
      <!-- Twitterのシェアボタン -->
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button"
        data-show-count="false">Tweet</a>

      <!-- はてなブックマークへのシェアボタン -->
      <a href="https://b.hatena.ne.jp/entry/" class="hatena-bookmark-button"
        data-hatena-bookmark-layout="basic-label-counter" data-hatena-bookmark-lang="ja"
        title="このエントリーをはてなブックマークに追加"><img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加"
          width="20" height="20" style="border: none;" /></a>

      <!-- noteへのシェアボタン -->
      <a href="https://note.com/intent/social_button" class="note-social-button"
        data-url="https://readability-checker.khufrudamonotes.com/"></a>

      <!-- Facebookへのシェアボタン -->
      <a class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button"
        data-action="recommend" data-size="small" data-share=""></a>

      <!-- Facebookへのシェアボタン -->
      <a id="fb-root"></a>

      <!-- pocketへのシェアボタン -->
      <a data-pocket-label="pocket" data-pocket-count="none" class="pocket-btn" data-lang="en"></a>

      <!-- Lineへのシェアボタン -->
      <a class="line-it-button" data-lang="ja" data-type="share-a" data-ver="3"
        data-url="https://o-to.khufrudamonotes.com/" data-color="default" data-size="small" data-count="true"
        style="display: none;"></a>

      <p>&copy; 2021- KHUFRUDAMO NOTES (since 2009) </p>
    </div>
    `
})

Vue.component('footer-template', {
  template: `
  <div class="float-end">
  <a href="info.html">このアプリについて</a></div>
    `
})

//インスタンスを作成する
const footer = new Vue({
  el: '#footer'
})


//見出し部分のコンポーネントを定義---------------------------------

Vue.component('title-display', {
  template: `
    <div class="position-relative overflow-hidden p-3 p-md-4 m-md-3 text-center bg-light">
      <div class="col-md-8 p-lg-2 mx-auto mt-5 mb-1">
        <h1 class="display-5 fw-normal">読みやすさチェッカー</h1>
        <p class="lead fw-normal">あなたの文章は何点！？</p>
      </div>
      <div class="product-device shadow-sm d-none d-md-block"></div>
      <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
    `
})

//見出し部分のコンポーネントのインスタンスを作成する
const titleDisplay = new Vue({
  el: '#display'
})


//俺のテキスト置換ツール見出し部分のコンポーネントを定義---------------------------------

Vue.component('ore-title-display', {
  template: `
    <div class="position-relative overflow-hidden p-3 p-md-4 m-md-3 text-center bg-light">
      <div class="col-md-8 p-lg-2 mx-auto mt-5 mb-1">
        <h1 class="display-5 fw-normal">俺のテキスト置換ツール</h1>
        <p class="lead fw-normal">地味に面倒くさい作業を効率化する</p>
      </div>
      <div class="product-device shadow-sm d-none d-md-block"></div>
      <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
    `
})

//見出し部分のコンポーネントのインスタンスを作成する
const oreTitleDisplay = new Vue({
  el: '#oreDisplay'
})


let chordColor = new Vue({
  el: "app",
  data: {
    check: "list-group-item col-xl text-center",
    check: "list-group-item list-group-item-danger col-xl text-center"
  },
  methods: {

  }

})

new Vue({
  el: '#tabBox',
  data: {
    isActive: '1',
  }
})