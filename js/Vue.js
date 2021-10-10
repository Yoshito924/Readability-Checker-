//headのコンポーネントを定義---------------------------------

Vue.component('head-template', {
  template: `
      <div>
      </div>
      `
})

//headのコンポーネントのインスタンスを作成する
const headTemplate = new Vue({
  el: '#head'
})

//ヘッダーのコンポーネントを定義---------------------------------

Vue.component('header-template', {
  template: `
      <div>
      <nav class="navbar navbar-expand-xxl navbar-dark fixed-top bg-dark">
      <div class="container-fluid">

      <a class="navbar-brand text-white" href="index.html">読みやすさチェッカー</a>

      <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li>
            <a class="nav-link" href="https://yoshito.khufrudamonotes.com/"target="_blank" rel="noopener noreferrer">開発者について</span></a>
          </li>
        </ul>
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
          <h5>関連ページへのリンク</h5>
        </div>
        <ul>
          <li>
            <a class="nav-link" href="https://yoshito.khufrudamonotes.com/"target="_blank" rel="noopener noreferrer">開発者について</span></a>
          </li>
          <li>
            <a class="nav-link" href="https://khufrudamonotes.com/contact-english"target="_blank" rel="noopener noreferrer">フィードバックはこちらからお願いいたします。</span></a>
          </li>
        </ul>
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