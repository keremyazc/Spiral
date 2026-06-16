const PAGE = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Spiral</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0d0d0d; color: #e8e8e6; overflow: hidden; }
  .bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .spiral { position: absolute; }
  .spiral.s1 { width: 300px; height: 300px; top: 8%; left: 20%; opacity: 0.10; transform: rotate(8deg); }
  .spiral.s2 { width: 240px; height: 240px; top: 60%; left: 12%; opacity: 0.08; transform: rotate(-22deg); }
  .spiral.s3 { width: 380px; height: 380px; top: 54%; left: 48%; opacity: 0.07; transform: rotate(36deg); }
  .spiral.s4 { width: 200px; height: 200px; top: 10%; left: 70%; opacity: 0.09; transform: rotate(-14deg); }
  .spiral.s5 { width: 260px; height: 260px; top: 30%; left: 82%; opacity: 0.08; transform: rotate(54deg); }
  body.study .spiral path { stroke: #2a9bf4; }
  body.study .spiral { opacity: 0.10; }

  /* login */
  .login { position: fixed; inset: 0; z-index: 50; background: #0d0d0d; display: flex; align-items: center; justify-content: center; }
  .login.hidden { display: none; }
  .login .card { width: 100%; max-width: 360px; text-align: center; padding: 24px; }
  .login-logo { width: 170px; height: auto; display: block; margin: 0 auto 22px; }
  .login input { width: 100%; height: 52px; background: #161616; border: 1px solid #2a2a2a; border-radius: 14px; color: #f4f4f2; font-size: 16px; padding: 0 16px; outline: none; margin-bottom: 12px; }
  .login input:focus { border-color: #2a9bf4; }
  .login button { display: block; width: 50%; margin: 0 auto; height: 50px; border: none; border-radius: 14px; background: #f4f4f2; color: #0d0d0d; font-size: 16px; font-weight: 600; cursor: pointer; }

  /* app shell */
  .app { position: relative; z-index: 1; display: flex; height: 100vh; overflow: hidden; }
  body.study { background: #0d0d0d; }

  .side { width: 220px; flex-shrink: 0; background: #0a0a0a; border-right: 1px solid #1a1a1a; display: flex; flex-direction: column; padding: 18px 14px; }
  .side-logo { width: 40px; height: 40px; margin: 4px auto 14px; display: block; }
  .side .hi { font-size: 15px; color: #e8e8e6; text-align: center; margin-bottom: 4px; }
  .side .hi b { color: #57b6ff; }
  .side .small { font-size: 11.5px; color: #6f6f6b; text-align: center; margin-bottom: 22px; }
  .nav { display: flex; flex-direction: column; gap: 6px; }
  .nav button { display: flex; align-items: center; gap: 10px; background: none; border: none; color: #b8b8b6; font-size: 14px; padding: 11px 13px; border-radius: 11px; cursor: pointer; text-align: left; transition: all .15s; }
  .nav button:hover { background: #161616; color: #fff; }
  .nav button.on { background: #16304d; color: #9cd0ff; }
  .nav button .ic { display: inline-flex; align-items: center; }
  .nav button .ic svg { width: 18px; height: 18px; }
  .side .sp1 { flex: 1; }
  .side .credit { font-size: 11px; color: #4a4a47; text-align: center; }
  .side .credit b { color: #6f6f6b; font-weight: 600; }

  .center { flex: 1; min-width: 0; overflow-y: auto; overflow-x: hidden; padding: 30px 28px; }
  .results { width: 46%; flex-shrink: 0; overflow-y: auto; overflow-x: hidden; padding: 30px 26px 30px 6px; }
  .results.full { display: none; }

  h2.title { font-size: 22px; color: #eaf2fb; margin-bottom: 4px; }
  .lead { color: #9fb4c9; font-size: 14px; margin-bottom: 22px; line-height: 1.5; }

  .drop { border: 1.5px dashed rgba(255,255,255,0.2); border-radius: 16px; padding: 22px; text-align: center; color: #c6d4e2; cursor: pointer; transition: all .15s; background: rgba(0,0,0,0.18); }
  .drop:hover, .drop.over { border-color: #2a9bf4; background: rgba(42,155,244,0.08); color: #fff; }
  .drop .big { font-size: 15px; font-weight: 600; }
  .drop .sm { font-size: 12.5px; color: #9fb4c9; margin-top: 5px; }
  .src-on { display: flex; align-items: center; gap: 10px; background: rgba(42,155,244,0.12); border: 1px solid rgba(42,155,244,0.3); border-radius: 14px; padding: 13px 16px; color: #cfe6ff; font-size: 14px; }
  .src-on .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .src-on button { background: none; border: none; color: #9fb4c9; cursor: pointer; font-size: 13px; }
  .src-on button:hover { color: #fff; }

  .askbar { display: flex; gap: 10px; margin: 16px 0 8px; }
  .askbar input { flex: 1; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; color: #eaf2fb; padding: 13px 15px; font-size: 14px; outline: none; }
  .askbar input:focus { border-color: #2a9bf4; }
  .btn-primary { background: #1f73c4; color: #fff; border: none; border-radius: 14px; padding: 0 22px; height: 48px; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; }
  .btn-primary:hover { background: #1763ab; }
  .hintline { font-size: 12.5px; color: #7d93a8; margin-bottom: 22px; }

  .search { display: flex; align-items: center; width: 100%; height: 56px; background: #fff; border: 3px solid #1f73c4; border-radius: 30px; overflow: hidden; margin: 0; }
  .search.over { border-color: #2a9bf4; box-shadow: 0 0 0 3px rgba(42,155,244,0.25); }
  .search input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-size: 16px; color: #16242f; padding: 0 8px; }
  .search input::placeholder { color: #8a9aa8; }
  .search .clip { background: none; border: none; cursor: pointer; padding: 0 8px 0 16px; display: flex; align-items: center; color: #5a7da6; }
  .search .clip:hover { color: #1f73c4; }
  .search .go { background: #1f73c4; border: none; width: 60px; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; }
  .search .go:hover { background: #1763ab; }
  .center .hero { max-width: 760px; margin: 0 auto; text-align: center; min-height: 70vh; display: flex; flex-direction: column; justify-content: center; }
  .center .hero .lead { text-align: center; }
  .searchwrap { max-width: 720px; margin: 0 auto; }
  .modes-row { display: flex; justify-content: center; margin-bottom: 10px; }
  .modes { display: inline-flex; gap: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 4px; margin: 0; }
  .modes button { background: none; border: none; color: #9fb4c9; font-size: 13px; padding: 8px 15px; border-radius: 10px; cursor: pointer; }
  .modes button:hover { color: #fff; }
  .modes button.on { background: #1f73c4; color: #fff; }
  .mhint { display: block; font-size: 11.5px; color: #7d93a8; margin: 0 auto 16px; max-width: 540px; line-height: 1.5; }
  .tlabel { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #5a5a57; margin: 18px 6px 8px; }
  .toolnav { display: flex; flex-direction: column; gap: 4px; }
  .toolnav button { display: flex; align-items: center; gap: 10px; background: none; border: none; color: #b8b8b6; font-size: 13.5px; padding: 9px 13px; border-radius: 10px; cursor: pointer; text-align: left; }
  .toolnav button:hover { background: #161616; color: #fff; }
  .toolnav button .ic { display: inline-flex; align-items: center; color: #57b6ff; }
  .toolnav button .ic svg { width: 17px; height: 17px; }
  .theme { display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: 1px solid #222; color: #9a9a97; border-radius: 11px; padding: 9px 12px; cursor: pointer; font-size: 13px; margin-bottom: 12px; }
  .theme:hover { border-color: #2a9bf4; color: #cfe2f5; }
  .theme svg { width: 16px; height: 16px; }
  .pomo { cursor: grab; user-select: none; }
  .pomo.dragging { cursor: grabbing; }
  .center.chatmode { display: flex; flex-direction: column; padding: 0; overflow: hidden; }
  .chatview { flex: 1; display: flex; flex-direction: column; min-height: 0; }
  .chat { flex: 1; overflow-y: auto; padding: 22px 26px; display: flex; flex-direction: column; gap: 10px; }
  .chat-empty { margin: auto; color: #7d93a8; font-size: 14px; text-align: center; max-width: 380px; line-height: 1.6; }
  .bubble { max-width: 76%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
  .bubble.me { align-self: flex-end; background: rgba(255,255,255,0.09); color: #e8e8e6; border-bottom-right-radius: 5px; }
  .bubble.ai { align-self: flex-start; background: #1f73c4; color: #fff; border-bottom-left-radius: 5px; }
  .bubble img { display: block; max-width: 260px; border-radius: 10px; }
  .bubble .svgimg { display: block; width: 100%; max-width: 360px; background: #fff; border-radius: 10px; padding: 8px; }
  .bubble.typing { color: #9fb4c9; font-style: italic; }
  .composer { padding: 20px 26px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .composer .searchwrap { max-width: 600px; margin: 0 auto; }
  .composer .modes-row { margin-bottom: 8px; }
  body.light .chat-empty { color: #8593a8; }
  body.light .bubble.ai { background: #1f73c4; color: #fff; }
  body.light .bubble.me { background: #e9edf2; color: #243244; }
  body.light .composer { border-bottom-color: #e3e7ee; }
  body.light { background: #eef1f5; color: #1b2532; }
  body.light.study { background: #eef1f5; }
  body.light .spiral { opacity: 0.13; }
  body.light .login { background: #eef1f5; }
  body.light .login input { background: #ffffff; border-color: #dce2ea; color: #16242f; }
  body.light .login button { background: #1f73c4; color: #fff; }
  body.light .side { background: #ffffff; border-right-color: #e3e7ee; }
  body.light .side .hi { color: #1b2532; }
  body.light .side .hi b { color: #1f73c4; }
  body.light .side .small { color: #8a94a3; }
  body.light .nav button { color: #4f5e74; }
  body.light .nav button:hover { background: #eef1f5; color: #16242f; }
  body.light .nav button.on { background: #dceafc; color: #1763ab; }
  body.light .side .credit { color: #aab3c0; }
  body.light .side .credit b { color: #6b7888; }
  body.light .tlabel { color: #9aa3b1; }
  body.light .toolnav button { color: #44526a; }
  body.light .toolnav button:hover { background: #eef1f5; color: #16242f; }
  body.light .theme { border-color: #dce2ea; color: #5a6b82; }
  body.light .theme:hover { border-color: #2a9bf4; color: #1763ab; }
  body.light h2.title { color: #16242f; }
  body.light .lead { color: #5a6b82; }
  body.light .hintline { color: #8593a8; }
  body.light .mhint { color: #8593a8; }
  body.light .modes { background: #ffffff; border-color: #dce2ea; }
  body.light .modes button { color: #5a6b82; }
  body.light .modes button:hover { color: #16242f; }
  body.light .modes button.on { background: #1f73c4; color: #fff; }
  body.light h3.rt { color: #16242f; }
  body.light .placeholder { color: #8593a8; }
  body.light .content { background: #ffffff; border-color: #e3e7ee; color: #283445; }
  body.light .src-on { background: #e7f1fd; border-color: #bcd9f7; color: #1c4a78; }
  body.light .src-on button { color: #5a7da6; }
  body.light .q { background: #ffffff; border-color: #e3e7ee; }
  body.light .q .qt { color: #16242f; }
  body.light .opt { color: #3a4a5e; border-color: #dce2ea; }
  body.light .opt.sel { background: #dceafc; color: #16242f; border-color: #2a9bf4; }
  body.light .score { color: #1f73c4; }
  body.light .rmsg { color: #16242f; }
  body.light .btn-ghost { color: #3a4a5e; border-color: #cfd6e0; }
  body.light .fc-front { background: #ffffff; border-color: #e3e7ee; color: #16242f; }
  body.light .fc-back { background: #e7f1fd; border-color: #bcd9f7; color: #1c4a78; }
  body.light .fc-nav { color: #5a6b82; }
  body.light .fc-nav button { background: #e9edf3; color: #3a4a5e; }
  body.light textarea.ta { background: #ffffff; border-color: #dce2ea; color: #16242f; }
  body.light .pg-chart { background: #ffffff; border-color: #e3e7ee; }
  body.light .pg-title { color: #5a6b82; }
  body.light .weak li { color: #33415a; }
  body.light .pomo { background: #ffffff; border-color: #e3e7ee; box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
  body.light .pomo-time { color: #16242f; }
  body.light .pomo-btns button { background: #e9edf3; color: #3a4a5e; }
  .tools { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .tool { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 20px 16px; cursor: pointer; transition: all .15s; }
  .tool:hover { border-color: #2a9bf4; background: rgba(42,155,244,0.1); transform: translateY(-2px); }
  .tool .ic { color: #57b6ff; height: 26px; }
  .tool .ic svg { width: 26px; height: 26px; }
  .tool .ti { font-size: 15px; font-weight: 600; color: #eaf2fb; margin-top: 8px; }
  .tool .ds { font-size: 12px; color: #9fb4c9; margin-top: 3px; line-height: 1.4; }

  h3.rt { font-size: 17px; color: #eaf2fb; margin-bottom: 12px; }
  .placeholder { display: flex; align-items: center; justify-content: center; height: 100%; min-height: 320px; color: #7d93a8; font-size: 14px; text-align: center; padding: 24px; }
  .content { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 22px; color: #dde8f3; font-size: 14px; line-height: 1.8; white-space: pre-wrap; }
  .loading { color: #9fb4c9; text-align: center; padding: 44px; font-size: 14px; }
  .back { background: none; border: none; color: #9fb4c9; cursor: pointer; font-size: 13px; margin-bottom: 14px; }
  .back:hover { color: #fff; }

  /* quiz */
  .q { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 18px; margin-bottom: 14px; }
  .q .qt { font-size: 15px; color: #eaf2fb; margin-bottom: 12px; font-weight: 600; }
  .opt { display: block; padding: 11px 13px; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; margin-bottom: 8px; cursor: pointer; color: #c6d4e2; font-size: 14px; }
  .opt:hover { border-color: #3a8fd6; }
  .opt.sel { border-color: #2a9bf4; background: rgba(42,155,244,0.16); color: #fff; }
  .opt.correct { border-color: #3ec46e; background: rgba(62,196,110,0.16); color: #d4f5e2; }
  .opt.wrong { border-color: #e06464; background: rgba(224,100,100,0.15); color: #f5d4d4; }
  .result { text-align: center; padding: 24px 12px; }
  .score { font-size: 56px; font-weight: 800; color: #57b6ff; line-height: 1; }
  .score small { font-size: 20px; color: #9fb4c9; }
  .rmsg { font-size: 16px; color: #eaf2fb; margin: 12px 0 20px; }
  .row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-ghost { padding: 13px 22px; border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; background: none; color: #cdd9e6; cursor: pointer; font-size: 15px; }

  /* flashcards */
  .fc { perspective: 1000px; margin-bottom: 14px; }
  .fc-card { position: relative; min-height: 150px; border-radius: 18px; cursor: pointer; transition: transform .5s; transform-style: preserve-3d; }
  .fc-card.flip { transform: rotateY(180deg); }
  .fc-face { position: absolute; inset: 0; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 22px; border-radius: 18px; text-align: center; font-size: 15px; line-height: 1.5; }
  .fc-front { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #eaf2fb; }
  .fc-back { background: rgba(42,155,244,0.16); border: 1px solid rgba(42,155,244,0.4); color: #dff0ff; transform: rotateY(180deg); }
  .fc-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; color: #9fb4c9; font-size: 13px; }
  .fc-nav button { background: rgba(255,255,255,0.08); border: none; color: #cdd9e6; width: 38px; height: 38px; border-radius: 10px; cursor: pointer; font-size: 16px; }
  .fc-nav button:hover { background: rgba(255,255,255,0.18); color: #fff; }

  textarea.ta { width: 100%; min-height: 130px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; color: #eaf2fb; padding: 14px; font-size: 14px; resize: vertical; outline: none; font-family: inherit; }
  textarea.ta:focus { border-color: #2a9bf4; }

  /* progress */
  .pg-chart { display: flex; align-items: flex-end; gap: 6px; height: 110px; background: rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 12px; margin-bottom: 8px; }
  .pg-bar { flex: 1; min-width: 7px; background: linear-gradient(180deg, #57b6ff, #1f73c4); border-radius: 4px 4px 0 0; align-self: flex-end; }
  .pg-title { font-size: 13px; color: #9fb4c9; margin-bottom: 8px; }
  .pg-title b { color: #8fe0b0; } .pg-title b.down { color: #f0a0a0; }
  .weak li { color: #dbe6f2; font-size: 13.5px; margin: 6px 0; line-height: 1.5; }

  /* pomodoro */
  .pomo { display: none; position: fixed; right: 22px; bottom: 22px; z-index: 6; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 12px 16px; align-items: center; gap: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
  body.study .pomo { display: flex; }
  .pomo-time { font-size: 24px; font-weight: 700; color: #eaf2fb; letter-spacing: 1px; font-variant-numeric: tabular-nums; }
  .pomo-btns { display: flex; gap: 6px; }
  .pomo-btns button { background: rgba(255,255,255,0.08); border: none; color: #cdd9e6; width: 32px; height: 32px; border-radius: 9px; cursor: pointer; font-size: 14px; }
  .pomo-btns button:hover { background: rgba(255,255,255,0.18); color: #fff; }

  @media (max-width: 820px) {
    .results { display: none; }
    .center { padding: 22px 16px; }
    .tools { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>
  <div class="bg" aria-hidden="true">
    <svg class="spiral s1" viewBox="0 0 200 200"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="spiral s2" viewBox="0 0 200 200"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="spiral s3" viewBox="0 0 200 200"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="spiral s4" viewBox="0 0 200 200"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="spiral s5" viewBox="0 0 200 200"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>

  <div class="login" id="login">
    <div class="card">
      <svg class="login-logo" viewBox="0 0 200 200" aria-label="Spiral"><path d="M 107.0 100.0 L 107.1 100.4 L 107.1 100.8 L 107.2 101.3 L 107.2 101.7 L 107.2 102.2 L 107.1 102.6 L 107.0 103.1 L 106.9 103.5 L 106.8 104.0 L 106.6 104.4 L 106.4 104.9 L 106.2 105.3 L 106.0 105.7 L 105.7 106.2 L 105.4 106.6 L 105.0 106.9 L 104.7 107.3 L 104.3 107.7 L 103.9 108.0 L 103.4 108.3 L 103.0 108.6 L 102.5 108.8 L 102.0 109.0 L 101.5 109.2 L 100.9 109.4 L 100.4 109.6 L 99.8 109.7 L 99.2 109.7 L 98.6 109.8 L 98.1 109.8 L 97.5 109.7 L 96.9 109.7 L 96.3 109.5 L 95.7 109.4 L 95.1 109.2 L 94.5 109.0 L 93.9 108.7 L 93.4 108.4 L 92.8 108.1 L 92.3 107.7 L 91.8 107.3 L 91.3 106.9 L 90.8 106.4 L 90.3 105.9 L 89.9 105.4 L 89.5 104.8 L 89.2 104.2 L 88.8 103.6 L 88.6 103.0 L 88.3 102.3 L 88.1 101.6 L 87.9 101.0 L 87.8 100.2 L 87.7 99.5 L 87.6 98.8 L 87.6 98.0 L 87.7 97.3 L 87.8 96.6 L 87.9 95.8 L 88.1 95.1 L 88.3 94.3 L 88.6 93.6 L 88.9 92.9 L 89.2 92.2 L 89.6 91.5 L 90.1 90.8 L 90.6 90.2 L 91.1 89.6 L 91.7 89.0 L 92.3 88.5 L 92.9 87.9 L 93.6 87.4 L 94.3 87.0 L 95.1 86.6 L 95.8 86.2 L 96.6 85.9 L 97.4 85.6 L 98.3 85.4 L 99.1 85.2 L 100.0 85.1 L 100.9 85.1 L 101.8 85.0 L 102.7 85.1 L 103.6 85.2 L 104.5 85.3 L 105.4 85.5 L 106.2 85.7 L 107.1 86.0 L 108.0 86.4 L 108.8 86.8 L 109.6 87.3 L 110.4 87.8 L 111.2 88.4 L 111.9 89.0 L 112.6 89.6 L 113.3 90.3 L 113.9 91.1 L 114.5 91.9 L 115.1 92.7 L 115.6 93.6 L 116.0 94.4 L 116.4 95.4 L 116.7 96.3 L 117.0 97.3 L 117.3 98.3 L 117.4 99.3 L 117.5 100.3 L 117.6 101.4 L 117.6 102.4 L 117.5 103.5 L 117.3 104.5 L 117.1 105.6 L 116.9 106.6 L 116.5 107.6 L 116.2 108.6 L 115.7 109.6 L 115.2 110.6 L 114.6 111.5 L 114.0 112.4 L 113.3 113.3 L 112.6 114.1 L 111.8 114.9 L 110.9 115.7 L 110.0 116.4 L 109.1 117.0 L 108.1 117.6 L 107.1 118.2 L 106.1 118.6 L 105.0 119.1 L 103.9 119.4 L 102.7 119.7 L 101.6 119.9 L 100.4 120.1 L 99.2 120.2 L 98.0 120.2 L 96.8 120.1 L 95.6 120.0 L 94.4 119.8 L 93.2 119.5 L 92.0 119.2 L 90.9 118.8 L 89.7 118.3 L 88.6 117.8 L 87.6 117.1 L 86.5 116.4 L 85.5 115.7 L 84.5 114.9 L 83.6 114.0 L 82.7 113.1 L 81.9 112.1 L 81.1 111.1 L 80.4 110.0 L 79.8 108.8 L 79.2 107.7 L 78.7 106.5 L 78.3 105.2 L 77.9 103.9 L 77.6 102.7 L 77.4 101.3 L 77.2 100.0 L 77.2 98.7 L 77.2 97.3 L 77.3 95.9 L 77.5 94.6 L 77.8 93.3 L 78.1 91.9 L 78.5 90.6 L 79.0 89.3 L 79.6 88.0 L 80.3 86.8 L 81.0 85.6 L 81.8 84.5 L 82.7 83.3 L 83.6 82.3 L 84.6 81.3 L 85.7 80.3 L 86.8 79.4 L 88.0 78.6 L 89.3 77.8 L 90.5 77.2 L 91.9 76.6 L 93.2 76.0 L 94.6 75.6 L 96.1 75.2 L 97.5 74.9 L 99.0 74.7 L 100.5 74.6 L 102.0 74.6 L 103.5 74.6 L 105.0 74.8 L 106.5 75.0 L 108.0 75.4 L 109.5 75.8 L 110.9 76.3 L 112.3 76.9 L 113.7 77.6 L 115.1 78.3 L 116.4 79.2 L 117.7 80.1 L 118.9 81.1 L 120.0 82.2 L 121.1 83.4 L 122.1 84.6 L 123.1 85.9 L 124.0 87.2 L 124.8 88.6 L 125.5 90.0 L 126.1 91.5 L 126.7 93.0 L 127.1 94.6 L 127.5 96.2 L 127.8 97.8 L 128.0 99.5 L 128.0 101.1 L 128.0 102.8 L 127.9 104.4 L 127.7 106.1 L 127.4 107.7 L 127.0 109.4 L 126.5 111.0 L 125.9 112.5 L 125.2 114.1 L 124.4 115.6 L 123.5 117.1 L 122.5 118.5 L 121.5 119.9 L 120.3 121.2 L 119.1 122.4 L 117.8 123.6 L 116.5 124.6 L 115.0 125.7 L 113.5 126.6 L 112.0 127.4 L 110.4 128.2 L 108.7 128.8 L 107.1 129.4 L 105.3 129.9 L 103.6 130.2 L 101.8 130.5 L 100.0 130.6 L 98.2 130.7 L 96.4 130.6 L 94.6 130.4 L 92.8 130.2 L 91.0 129.8 L 89.2 129.3 L 87.5 128.7 L 85.7 128.0 L 84.1 127.2 L 82.4 126.3 L 80.9 125.3 L 79.3 124.2 L 77.9 123.0 L 76.5 121.7 L 75.2 120.4 L 73.9 118.9 L 72.8 117.4 L 71.7 115.8 L 70.8 114.2 L 69.9 112.5 L 69.1 110.7 L 68.4 108.9 L 67.9 107.0 L 67.4 105.2 L 67.1 103.2 L 66.8 101.3 L 66.7 99.3 L 66.7 97.4 L 66.8 95.4 L 67.1 93.4 L 67.4 91.5 L 67.9 89.6 L 68.5 87.7 L 69.1 85.8 L 70.0 83.9 L 70.9 82.1 L 71.9 80.4 L 73.0 78.7 L 74.2 77.1 L 75.6 75.6 L 77.0 74.1 L 78.5 72.7 L 80.1 71.4 L 81.7 70.2 L 83.5 69.1 L 85.3 68.1 L 87.2 67.2 L 89.1 66.4 L 91.0 65.7 L 93.1 65.1 L 95.1 64.7 L 97.2 64.4 L 99.3 64.2 L 101.4 64.1 L 103.5 64.1 L 105.7 64.3 L 107.8 64.6 L 109.9 65.0 L 111.9 65.6 L 114.0 66.2 L 116.0 67.0 L 117.9 68.0 L 119.9 69.0 L 121.7 70.1 L 123.5 71.4 L 125.2 72.7 L 126.8 74.2 L 128.4 75.8 L 129.8 77.4 L 131.2 79.2 L 132.5 81.0 L 133.6 82.9 L 134.6 84.8 L 135.6 86.9 L 136.4 89.0 L 137.1 91.1 L 137.6 93.3 L 138.0 95.5 L 138.3 97.7 L 138.5 100.0" fill="none" stroke="#2a9bf4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <input id="nameInput" type="text" placeholder="örn: özge, kerem" autocomplete="off">
      <button id="loginBtn">giriş yap</button>
    </div>
  </div>

  <div class="app" id="app">
    <div class="side">
      <div class="hi">Merhaba, <b id="uName">öğrenci</b></div>
      <div class="nav" id="nav">
        <button data-v="study" class="on"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg></span> Çalış</button>
        <button data-v="plan"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="3" x2="8" y2="6"/><line x1="16" y1="3" x2="16" y2="6"/></svg></span> Dersler</button>
        <button data-v="progress"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="18" y1="20" x2="18" y2="11"/></svg></span> İlerleme</button>
      </div>
      <div class="tlabel">Araçlar</div>
      <div class="toolnav" id="toolnav"></div>
      <div class="sp1"></div>
      <button class="theme" id="themeBtn"><span id="themeIc"></span><span id="themeLbl">Açık mod</span></button>
      <div class="credit">geliştiren: <b>kerem yazıcı</b> &middot; <span style="color:#57b6ff">sürüm: cizim-11</span></div>
    </div>
    <div class="center" id="center"></div>
    <div class="results" id="results"></div>
  </div>

  <div class="pomo" id="pomo">
    <div class="pomo-time" id="pomoTime">25:00</div>
    <div class="pomo-btns">
      <button id="pomoToggle" aria-label="başlat">▶</button>
      <button id="pomoReset" aria-label="sıfırla">↺</button>
    </div>
  </div>

  <input id="srcFile" type="file" accept=".txt,.md,.csv,.pdf" hidden>
  <input id="imgFile" type="file" accept="image/*" hidden>

<script>
  var user = null;
  var loginEl = document.getElementById('login');
  var nameInput = document.getElementById('nameInput');
  var uName = document.getElementById('uName');
  var center = document.getElementById('center');
  var results = document.getElementById('results');
  var nav = document.getElementById('nav');
  var srcFile = document.getElementById('srcFile');
  var imgFile = document.getElementById('imgFile');
  var view = 'study';
  var source = { type: null, text: '', pdf: '', name: '' };
  var quizRound = 0;
  var solveTarget = 'results';

  function esc(x){ return String(x == null ? '' : x).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;'); }
  var ICON_CLIP = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 6"/></svg>';
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>';
  var ICON_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>';
  var ICON_QUIZ = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 13l2 2 4-4"/></svg>';
  var ICON_CARDS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>';
  var ICON_SOLVE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>';
  var ICON_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/></svg>';
  var ICON_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="3" x2="8" y2="6"/><line x1="16" y1="3" x2="16" y2="6"/></svg>';
  var ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/></svg>';
  var ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
  var ICON_IMG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
  var ICON_DGM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v3a2 2 0 0 0 2 2h6"/></svg>';
  var mode = 'detay', theme = 'dark';
  var chatMsgs = [], chatBusy = false, drawing = false;
  try { var _sm = localStorage.getItem('inkey_mode'); if (_sm) mode = _sm; } catch(e){}
  try { var _st = localStorage.getItem('inkey_theme'); if (_st) theme = _st; } catch(e){}
  function applyTheme(){ document.body.classList.toggle('light', theme === 'light'); var ic = document.getElementById('themeIc'), lb = document.getElementById('themeLbl'); if (ic) ic.innerHTML = (theme === 'light' ? ICON_MOON : ICON_SUN); if (lb) lb.textContent = (theme === 'light' ? 'Koyu mod' : 'Açık mod'); }
  document.getElementById('themeBtn').addEventListener('click', function(){ theme = (theme === 'light' ? 'dark' : 'light'); try { localStorage.setItem('inkey_theme', theme); } catch(e){} applyTheme(); });
  applyTheme();
  function setMode(m){ mode = m; try { localStorage.setItem('inkey_mode', m); } catch(e){} var mb = document.querySelectorAll('.modes button'); for (var i=0;i<mb.length;i++){ mb[i].classList.toggle('on', mb[i].getAttribute('data-m') === m); } }
  function goStudy(){ if (view !== 'study') setView('study'); }
  function tbtn(id, ic, label){ return '<button id="'+id+'"><span class="ic">'+ic+'</span> '+label+'</button>'; }
  function renderToolnav(){
    var t = document.getElementById('toolnav'); if (!t) return;
    t.innerHTML = tbtn('cSum', ICON_DOC, 'Özet') + tbtn('cQuiz', ICON_QUIZ, 'Sınav') + tbtn('cSolve', ICON_SOLVE, 'Soru Çöz') + tbtn('cExp', ICON_BOOK, 'Konu Anlat') + tbtn('cDraw', ICON_IMG, 'Resim Çiz') + tbtn('cDgm', ICON_DGM, 'Şema Çiz');
    document.getElementById('cSum').addEventListener('click', function(){ goStudy(); doSummary(); });
    document.getElementById('cQuiz').addEventListener('click', function(){ goStudy(); startQuiz(); });
    document.getElementById('cSolve').addEventListener('click', function(){ goStudy(); imgFile.click(); });
    document.getElementById('cExp').addEventListener('click', function(){ goStudy(); doExplain(); });
    document.getElementById('cDraw').addEventListener('click', function(){ goStudy(); doDraw(); });
    document.getElementById('cDgm').addEventListener('click', function(){ goStudy(); doDiagram(); });
  }

  /* ---- login ---- */
  function doLogin(){
    var n = nameInput.value.trim();
    if (!n) { nameInput.focus(); return; }
    user = n;
    try { localStorage.setItem('inkey_user', n); } catch(e){}
    uName.textContent = n;
    loginEl.classList.add('hidden');
    document.body.classList.add('study');
    renderToolnav();
    setView('study');
  }
  document.getElementById('loginBtn').addEventListener('click', doLogin);
  nameInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') doLogin(); });
  try { var su = localStorage.getItem('inkey_user'); if (su) { nameInput.value = su; } } catch(e){}

  /* ---- nav ---- */
  nav.addEventListener('click', function(e){
    var b = e.target.closest('button'); if (!b) return;
    setView(b.getAttribute('data-v'));
  });
  function setView(v){
    view = v;
    var bs = nav.querySelectorAll('button');
    for (var i=0;i<bs.length;i++){ bs[i].classList.toggle('on', bs[i].getAttribute('data-v')===v); }
    if (v === 'study') { renderStudy(); }
    else if (v === 'plan') { center.classList.remove('chatmode'); renderPlan(); }
    else { center.classList.remove('chatmode'); renderProgress(); }
    hideResults();
  }

  /* ---- study view ---- */
  function renderStudy(){
    center.classList.add('chatmode');
    var chip = source.type
      ? ('<div class="src-on"><span>✓</span><span class="nm">' + esc(source.name || 'metin yüklendi') + '</span><button id="srcClear">kaldır</button></div>')
      : '';
    center.innerHTML =
      '<div class="chatview">' +
        '<div class="composer">' +
          '<div class="searchwrap">' +
            '<div class="modes-row"><div class="modes">' +
              '<button data-m="hizli">Hızlandırılmış</button>' +
              '<button data-m="detay">Detaylı</button>' +
              '<button data-m="derin">Derinlemesine</button>' +
            '</div></div>' +
            '<div class="search" id="search">' +
              '<button class="clip" id="attach" title="Not ekle" aria-label="Not ekle">' + ICON_CLIP + '</button>' +
              '<input id="askIn" placeholder="">' +
              '<button class="go" id="askGo" title="Sor" aria-label="Sor">' + ICON_SEARCH + '</button>' +
            '</div>' +
            chip +
          '</div>' +
        '</div>' +
        '<div class="chat" id="chat"></div>' +
      '</div>';
    var sb = document.getElementById('search');
    sb.addEventListener('dragover', function(e){ e.preventDefault(); sb.classList.add('over'); });
    sb.addEventListener('dragleave', function(){ sb.classList.remove('over'); });
    sb.addEventListener('drop', function(e){ e.preventDefault(); sb.classList.remove('over'); if (e.dataTransfer.files[0]) readSource(e.dataTransfer.files[0]); });
    document.getElementById('attach').addEventListener('click', function(){ srcFile.click(); });
    var sc = document.getElementById('srcClear');
    if (sc) sc.addEventListener('click', function(){ source = { type:null, text:'', pdf:'', name:'' }; renderStudy(); });
    document.getElementById('askGo').addEventListener('click', doAsk);
    document.getElementById('askIn').addEventListener('keydown', function(e){ if (e.key==='Enter') doAsk(); });
    var mbs = center.querySelectorAll('.modes button');
    for (var i=0;i<mbs.length;i++){ mbs[i].addEventListener('click', function(){ setMode(this.getAttribute('data-m')); }); }
    setMode(mode);
    renderChat();
  }
  function tool(id,ic,ti,ds){ return '<div class="tool" id="'+id+'"><div class="ic">'+ic+'</div><div class="ti">'+ti+'</div><div class="ds">'+ds+'</div></div>'; }

  function needSource(){
    if (source.type) return true;
    resultsShow('<div class="placeholder">Önce soldan bir not (PDF veya metin) yükle, sonra tekrar dene.</div>');
    return false;
  }
  function showResults(){ results.classList.remove('full'); }
  function hideResults(){ results.classList.add('full'); results.innerHTML = ''; }
  function resultsShow(h){ showResults(); results.innerHTML = h; }
  function resultsDefault(){ hideResults(); }
  function resultsLoading(m){ showResults(); results.innerHTML = '<div class="loading">'+esc(m)+'</div>'; }

  /* ---- source files ---- */
  srcFile.addEventListener('change', function(e){ if (e.target.files[0]) readSource(e.target.files[0]); srcFile.value=''; });
  function readSource(f){
    if (f.size > 6*1024*1024){ alert('Dosya 6MB sınırını aşıyor.'); return; }
    var nm = (f.name||'').toLowerCase();
    var isPdf = (f.type && f.type.indexOf('pdf')!==-1) || nm.endsWith('.pdf');
    var r = new FileReader();
    r.onload = function(){
      if (isPdf){ var b64 = String(r.result).split(',')[1] || ''; source = { type:'pdf', pdf:b64, text:'', name:f.name }; }
      else { source = { type:'text', text:String(r.result), pdf:'', name:f.name }; }
      renderStudy();
    };
    if (isPdf) r.readAsDataURL(f); else r.readAsText(f);
  }

  /* ---- image: paste or pick -> solve ---- */
  imgFile.addEventListener('change', function(e){ var f=e.target.files[0]; if(f) readImage(f); imgFile.value=''; });
  function readImage(f){
    if (f.size > 6*1024*1024){ alert('Görsel 6MB sınırını aşıyor.'); return; }
    var r = new FileReader();
    r.onload = function(){ var parts=String(r.result).split(','); doSolve(parts[1]||'', f.type||'image/png'); };
    r.readAsDataURL(f);
  }
  document.addEventListener('paste', function(e){
    if (!user || view !== 'study') return;
    var items = (e.clipboardData && e.clipboardData.items) || [];
    for (var i=0;i<items.length;i++){
      if (items[i].type && items[i].type.indexOf('image')!==-1){
        var f = items[i].getAsFile();
        if (f){ readImage(f); e.preventDefault(); return; }
      }
    }
  });

  /* ---- api ---- */
  function api(payload){
    var body = { sourceType: source.type, text: source.text, pdf: source.pdf, user: user, mode: mode };
    for (var k in payload) body[k] = payload[k];
    return fetch('/study', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(function(r){ return r.json(); });
  }

  /* ---- chat ---- */
  function renderChat(){
    var c = document.getElementById('chat'); if (!c) return;
    if (!chatMsgs.length && !chatBusy){ c.innerHTML = '<div class="chat-empty">Bir soru sor, ataç simgesinden notunu ekle ya da soru fotoğrafını Ctrl+V ile yapıştır. Hadi konuşalım.</div>'; return; }
    var h = '';
    for (var i=0;i<chatMsgs.length;i++){
      var m = chatMsgs[i];
      if (m.image) h += '<div class="bubble ' + (m.role === 'me' ? 'me' : 'ai') + '"><img src="' + m.image + '" alt=""></div>';
      if (m.svg) h += '<div class="bubble ai"><img class="svgimg" src="data:image/svg+xml,' + encodeURIComponent(m.svg) + '" alt="şema"></div>';
      if (m.text) h += '<div class="bubble ' + (m.role === 'me' ? 'me' : 'ai') + '">' + esc(m.text) + '</div>';
    }
    if (chatBusy) h += '<div class="bubble ai typing">yazıyor...</div>';
    c.innerHTML = h; c.scrollTop = c.scrollHeight;
  }
  function pushMe(t){ chatMsgs.push({ role:'me', text:t }); }
  function pushAi(t){ chatMsgs.push({ role:'ai', text:t }); }
  function chatHistory(){ var a=[]; for (var i=0;i<chatMsgs.length;i++){ if (chatMsgs[i].text) a.push({ role:(chatMsgs[i].role==='me'?'user':'assistant'), text:chatMsgs[i].text }); } return a; }
  function needSourceChat(){ if (source.type) return true; pushAi('Önce ataç simgesinden bir not ekle (PDF ya da metin), sonra tekrar dene.'); renderChat(); return false; }

  function isDrawIntent(t){
    t = t.toLowerCase();
    if (t.indexOf('çiz') >= 0) return true;
    if ((t.indexOf('resim') >= 0 || t.indexOf('görsel') >= 0 || t.indexOf('resmini') >= 0) && (t.indexOf('yap') >= 0 || t.indexOf('oluştur') >= 0 || t.indexOf('üret') >= 0)) return true;
    return false;
  }
  function cleanDrawPrompt(q){
    var t = q.trim(); var low = t.toLowerCase();
    var kill = ['resmini çizer misin', 'resim çizer misin', 'çizebilir misin', 'çizer misin', 'resmini çiz', 'resim çiz', 'görselini oluştur', 'görsel oluştur', 'görselini yap', 'görsel yap', 'resmini yap', 'resim yap', 'çizebilirsin', 'çizebilir', 'çizsene', 'çiziver', 'çizer', 'çiz', 'lütfen', 'bana bir', 'bana', 'bir tane'];
    for (var i = 0; i < kill.length; i++){ var idx = low.indexOf(kill[i]); while (idx >= 0){ t = (t.slice(0, idx) + ' ' + t.slice(idx + kill[i].length)); low = t.toLowerCase(); idx = low.indexOf(kill[i]); } }
    while (t.indexOf('  ') >= 0) t = t.split('  ').join(' ');
    t = t.trim();
    while (t.length && (t.charAt(t.length-1) === ',' || t.charAt(t.length-1) === '.')) t = t.slice(0, -1).trim();
    return t || q;
  }
  function drawPrompt(p){
    if (drawing){ pushAi('Bir resim zaten hazırlanıyor, o bitsin önce.'); renderChat(); return; }
    drawing = true;
    pushMe(p + ' (resim çiz)'); chatBusy = true; renderChat();
    var seed = Math.floor(Math.random() * 1000000);
    var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(p) + '?width=1024&height=1024&nologo=true&referrer=spiralstudy&seed=' + seed;
    var done = false;
    var im = new Image();
    im.onload = function(){ if (done) return; done = true; drawing = false; chatBusy = false; chatMsgs.push({ role:'ai', image: url }); renderChat(); };
    im.onerror = function(){ if (done) return; done = true; drawing = false; chatBusy = false; pushAi('Resim gelmedi. 20 saniye bekleyip bir kez daha dene (ücretsiz sürüm aynı anda tek resme izin veriyor).'); renderChat(); };
    im.src = url;
    setTimeout(function(){ if (done) return; done = true; drawing = false; chatBusy = false; pushAi('Resim çok yavaş geldi. 20 saniye bekleyip tekrar dene.'); renderChat(); }, 50000);
  }
  function isDiagramIntent(t){
    t = t.toLowerCase();
    var dr = (t.indexOf('çiz') >= 0 || t.indexOf('şema') >= 0 || t.indexOf('diagram') >= 0 || t.indexOf('diyagram') >= 0);
    if (!dr) return false;
    var tech = ['devre','şema','diagram','diyagram','grafik','geometri','akış','op-amp','opamp','transistör','direnç','kondansatör','fonksiyon','koordinat','eksen','molekül','atom','hücre','organ','vektör'];
    for (var i = 0; i < tech.length; i++){ if (t.indexOf(tech[i]) >= 0) return true; }
    return false;
  }
  function drawSvg(p){
    if (drawing){ pushAi('Bir çizim zaten hazırlanıyor, o bitsin önce.'); renderChat(); return; }
    drawing = true;
    pushMe(p + ' (şema çiz)'); chatBusy = true; renderChat();
    api({ action:'svg', prompt:p }).then(function(d){
      drawing = false; chatBusy = false;
      if (d && d.svg && d.svg.indexOf('<svg') >= 0){ chatMsgs.push({ role:'ai', svg: d.svg }); }
      else pushAi((d && d.error) || 'Şema üretilemedi, tekrar dene.');
      renderChat();
    }).catch(function(){ drawing = false; chatBusy = false; pushAi('Hata oldu, tekrar dene.'); renderChat(); });
  }
  function doDiagram(){
    goStudy();
    var inp = document.getElementById('askIn'); var p = inp ? inp.value.trim() : '';
    if (!p){ pushAi('Ne çizmemi istersin? Üstteki kutuya yaz (örnek: op-amp yükselteç devresi), sonra Şema Çiz tuşuna bas.'); renderChat(); return; }
    if (inp) inp.value = '';
    drawSvg((isDrawIntent(p) || isDiagramIntent(p)) ? cleanDrawPrompt(p) : p);
  }
  function doAsk(){
    var inp = document.getElementById('askIn'); var q = inp.value.trim(); if (!q) return; inp.value = '';
    if (isDiagramIntent(q)){ drawSvg(cleanDrawPrompt(q)); return; }
    if (isDrawIntent(q)){ drawPrompt(cleanDrawPrompt(q)); return; }
    pushMe(q); chatBusy = true; renderChat();
    api({ action:'chat', messages: chatHistory() }).then(function(d){ chatBusy = false; pushAi((d&&d.text)||'Cevap alınamadı.'); renderChat(); }).catch(function(){ chatBusy = false; pushAi('Hata oldu, tekrar dene.'); renderChat(); });
  }
  function doSummary(){
    goStudy(); if (!needSourceChat()) return;
    pushMe('Bu notu özetle'); chatBusy = true; renderChat();
    api({ action:'summary' }).then(function(d){ chatBusy = false; pushAi((d&&d.text)||'Özet alınamadı.'); renderChat(); }).catch(function(){ chatBusy = false; pushAi('Hata oldu, tekrar dene.'); renderChat(); });
  }
  function doExplain(){
    goStudy();
    var inp = document.getElementById('askIn'); var topic = inp ? inp.value.trim() : '';
    if (!topic && !source.type){ pushAi('Anlatmamı istediğin konuyu yaz ya da bir not ekle.'); renderChat(); return; }
    if (inp) inp.value = '';
    pushMe(topic ? (topic + ' konusunu anlat') : 'Bu notdaki konuyu anlat'); chatBusy = true; renderChat();
    api({ action:'explain', topic:topic }).then(function(d){ chatBusy = false; pushAi((d&&d.text)||'Alınamadı.'); renderChat(); }).catch(function(){ chatBusy = false; pushAi('Hata oldu, tekrar dene.'); renderChat(); });
  }
  function doSolve(image, mime){
    if (!image) return; goStudy();
    chatMsgs.push({ role:'me', image:'data:' + (mime || 'image/png') + ';base64,' + image }); chatBusy = true; renderChat();
    api({ action:'solve', image:image, imageType:mime }).then(function(d){ chatBusy = false; pushAi((d&&d.text)||'Çözüm alınamadı.'); renderChat(); }).catch(function(){ chatBusy = false; pushAi('Hata oldu, tekrar dene.'); renderChat(); });
  }
  function doDraw(){
    goStudy();
    var inp = document.getElementById('askIn'); var p = inp ? inp.value.trim() : '';
    if (!p){ pushAi('Ne çizmemi istersin? Üstteki kutuya yaz (örnek: kanatları açık bir uçak) ya da direkt "... çiz" diye yaz, çizeyim.'); renderChat(); return; }
    if (inp) inp.value = '';
    drawPrompt(isDrawIntent(p) ? cleanDrawPrompt(p) : p);
  }
  /* ---- flashcards ---- */
  function doFlashcards(){
    if (!needSource()) return;
    resultsLoading('Kartlar hazırlanıyor...');
    api({ action:'flashcards' }).then(function(d){
      var cards = (d&&d.cards)||[];
      if (!cards.length){ resultsLoading('Kart üretilemedi, tekrar dene.'); return; }
      renderFlashcards(cards);
    }).catch(function(){ resultsLoading('Hata oldu, tekrar dene.'); });
  }
  function renderFlashcards(cards){
    var idx = 0;
    function draw(){
      var c = cards[idx];
      results.innerHTML =
        '<h3 class="rt">Flashcard</h3>' +
        '<div class="fc"><div class="fc-card" id="fcCard"><div class="fc-face fc-front">'+esc(c.front)+'</div><div class="fc-face fc-back">'+esc(c.back)+'</div></div></div>' +
        '<div class="fc-nav"><button id="fcPrev">‹</button><span>'+(idx+1)+' / '+cards.length+' · karta tıkla çevir</span><button id="fcNext">›</button></div>';
      var card = document.getElementById('fcCard');
      card.addEventListener('click', function(){ card.classList.toggle('flip'); });
      document.getElementById('fcPrev').addEventListener('click', function(){ idx=(idx-1+cards.length)%cards.length; draw(); });
      document.getElementById('fcNext').addEventListener('click', function(){ idx=(idx+1)%cards.length; draw(); });
    }
    draw();
  }

  /* ---- quiz ---- */
  function startQuiz(){
    if (!needSource()) return;
    quizRound++;
    resultsLoading('Sınav hazırlanıyor...');
    api({ action:'quiz', n:5, seed:String(Date.now())+'-'+quizRound }).then(function(d){
      var qs=(d&&d.questions)||[];
      if (!qs.length){ resultsLoading('Soru üretilemedi, tekrar dene.'); return; }
      renderQuiz(qs);
    }).catch(function(){ resultsLoading('Hata oldu, tekrar dene.'); });
  }
  function renderQuiz(qs){
    var picks=[]; for (var i=0;i<qs.length;i++) picks.push(-1);
    var html='<h3 class="rt">Sınav ('+qs.length+' soru)</h3>';
    qs.forEach(function(q,qi){
      html+='<div class="q"><div class="qt">'+(qi+1)+'. '+esc(q.q)+'</div>';
      q.options.forEach(function(o,oi){ html+='<label class="opt" data-q="'+qi+'" data-o="'+oi+'">'+esc(o)+'</label>'; });
      html+='</div>';
    });
    html+='<button class="btn-primary" id="qSubmit" style="height:46px">Bitir ve Puanla</button>';
    results.innerHTML=html;
    results.querySelectorAll('.opt').forEach(function(el){
      el.addEventListener('click', function(){
        var qi=+el.getAttribute('data-q'), oi=+el.getAttribute('data-o'); picks[qi]=oi;
        results.querySelectorAll('.opt[data-q="'+qi+'"]').forEach(function(x){ x.classList.remove('sel'); });
        el.classList.add('sel');
      });
    });
    document.getElementById('qSubmit').addEventListener('click', function(){
      var correct=0, missed=[];
      qs.forEach(function(q,qi){
        results.querySelectorAll('.opt[data-q="'+qi+'"]').forEach(function(x){
          var oi=+x.getAttribute('data-o');
          if (oi===q.answer) x.classList.add('correct'); else if (oi===picks[qi]) x.classList.add('wrong');
          x.style.pointerEvents='none';
        });
        if (picks[qi]===q.answer) correct++; else missed.push(q.q);
      });
      saveWeak(missed);
      showResult(Math.round(correct/qs.length*100), correct, qs.length);
    });
  }
  function showResult(score, correct, total){
    saveScore(score);
    var msg = score>=80 ? 'Harika! Bu konuyu iyi biliyorsun.' : (score>=50 ? 'Fena değil, biraz daha çalış.' : 'Biraz daha tekrar lazım. Hadi tekrar!');
    var res=document.createElement('div'); res.className='result';
    res.innerHTML='<div class="score">'+score+'<small>/100</small></div><div class="lead" style="margin:6px 0 0">'+correct+' / '+total+' doğru</div><div class="rmsg">'+msg+'</div><div class="row"><button class="btn-primary" id="qAgain" style="height:46px">Yeni Sınav</button><button class="btn-ghost" id="qDone">Bitti</button></div>';
    results.appendChild(res); res.scrollIntoView({behavior:'smooth'});
    document.getElementById('qAgain').addEventListener('click', startQuiz);
    document.getElementById('qDone').addEventListener('click', resultsDefault);
  }

  /* ---- plan view ---- */
  function renderPlan(){
    center.innerHTML =
      '<h2 class="title">Dersler</h2>' +
      '<div class="lead">Hangi derslere çalışıyorsun? Derslerini ve sınav tarihlerini yaz, sana güne bölünmüş bir plan çıkaralım.</div>' +
      '<textarea class="ta" id="planIn" placeholder="Örnek:&#10;Matematik vize - 20 Haziran&#10;Fizik final - 23 Haziran&#10;Tarih - 25 Haziran&#10;Günde ~3 saat çalışabilirim"></textarea>' +
      '<div style="margin-top:14px"><button class="btn-primary" id="planGo">Plan oluştur</button></div>' +
      '<div id="planOut" style="margin-top:20px"></div>';
    document.getElementById('planGo').addEventListener('click', function(){
      var t = document.getElementById('planIn').value.trim();
      if (!t){ return; }
      var out = document.getElementById('planOut');
      out.innerHTML='<div class="loading">Plan hazırlanıyor...</div>';
      api({ action:'plan', exams:t }).then(function(d){ out.innerHTML='<div class="content">'+esc((d&&d.text)||'Plan alınamadı.')+'</div>'; }).catch(function(){ out.innerHTML='<div class="loading">Hata oldu, tekrar dene.</div>'; });
    });
  }

  /* ---- progress view ---- */
  function scoresKey(){ return 'inkey_scores_'+(user||'x'); }
  function weakKey(){ return 'inkey_weak_'+(user||'x'); }
  function loadScores(){ try { return JSON.parse(localStorage.getItem(scoresKey())||'[]'); } catch(e){ return []; } }
  function saveScore(s){ var a=loadScores(); a.push(s); if (a.length>24) a=a.slice(-24); try{ localStorage.setItem(scoresKey(), JSON.stringify(a)); }catch(e){} }
  function loadWeak(){ try { return JSON.parse(localStorage.getItem(weakKey())||'[]'); } catch(e){ return []; } }
  function saveWeak(arr){ if (!arr || !arr.length) return; var a=loadWeak(); for (var i=0;i<arr.length;i++) a.push(arr[i]); if (a.length>30) a=a.slice(-30); try{ localStorage.setItem(weakKey(), JSON.stringify(a)); }catch(e){} }
  function renderProgress(){
    var a=loadScores(); var w=loadWeak();
    var chart='';
    if (a.length){
      var bars=''; for (var i=0;i<a.length;i++) bars+='<div class="pg-bar" style="height:'+Math.max(6,a[i])+'%" title="'+a[i]+' puan"></div>';
      var trend='';
      if (a.length>=2){ var diff=a[a.length-1]-a[a.length-2]; trend = diff>0 ? ' · <b>▲ yükseliyorsun</b>' : (diff<0 ? ' · <b class="down">▼ düştü</b>' : ' · → aynı'); }
      var avg=Math.round(a.reduce(function(x,y){return x+y;},0)/a.length);
      chart='<div class="pg-title">Sınav puanların ('+a.length+' sınav · ortalama '+avg+')'+trend+'</div><div class="pg-chart">'+bars+'</div>';
    } else {
      chart='<div class="placeholder" style="min-height:140px">Henüz sınav çözmedin. Çalış sekmesinden bir sınav çöz, ilerlemen burada görünsün.</div>';
    }
    var weakHtml='';
    if (w.length){
      var lis=''; var seen={}; var cnt=0;
      for (var j=w.length-1;j>=0 && cnt<10;j--){ if (seen[w[j]]) continue; seen[w[j]]=1; cnt++; lis+='<li>'+esc(w[j])+'</li>'; }
      weakHtml='<h3 class="rt" style="margin-top:24px">Tekrar etmen gereken sorular</h3><ul class="weak">'+lis+'</ul>';
    }
    center.innerHTML='<h2 class="title">İlerleme</h2><div class="lead">Sınav puanların ve eksik kaldığın yerler.</div>'+chart+weakHtml;
  }

  /* ---- pomodoro ---- */
  var pomoTimeEl=document.getElementById('pomoTime'), pomoToggle=document.getElementById('pomoToggle'), pomoReset=document.getElementById('pomoReset');
  var pomoSecs=25*60, pomoTimer=null, pomoRunning=false;
  function pomoRender(){ var m=Math.floor(pomoSecs/60), s=pomoSecs%60; pomoTimeEl.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s; }
  function pomoStop(){ pomoRunning=false; if (pomoTimer){ clearInterval(pomoTimer); pomoTimer=null; } pomoToggle.textContent='▶'; }
  function pomoStart(){ if (pomoRunning) return; pomoRunning=true; pomoToggle.textContent='⏸'; pomoTimer=setInterval(function(){ if (pomoSecs>0){ pomoSecs--; pomoRender(); } else { pomoStop(); try{ alert('Pomodoro bitti! Kısa bir mola ver.'); }catch(e){} pomoSecs=25*60; pomoRender(); } }, 1000); }
  pomoToggle.addEventListener('click', function(){ if (pomoRunning) pomoStop(); else pomoStart(); });
  pomoReset.addEventListener('click', function(){ pomoStop(); pomoSecs=25*60; pomoRender(); });
  pomoRender();

  /* ---- sayacı sürükle ---- */
  (function(){
    var pomo = document.getElementById('pomo'); if (!pomo) return;
    var dragging = false, ox = 0, oy = 0;
    pomo.addEventListener('mousedown', function(e){
      if (e.target.closest('button')) return;
      var r = pomo.getBoundingClientRect();
      pomo.style.left = r.left + 'px'; pomo.style.top = r.top + 'px'; pomo.style.right = 'auto'; pomo.style.bottom = 'auto';
      ox = e.clientX - r.left; oy = e.clientY - r.top; dragging = true; pomo.classList.add('dragging'); e.preventDefault();
    });
    document.addEventListener('mousemove', function(e){
      if (!dragging) return;
      var x = e.clientX - ox, y = e.clientY - oy;
      x = Math.max(2, Math.min(window.innerWidth - pomo.offsetWidth - 2, x));
      y = Math.max(2, Math.min(window.innerHeight - pomo.offsetHeight - 2, y));
      pomo.style.left = x + 'px'; pomo.style.top = y + 'px';
    });
    document.addEventListener('mouseup', function(){ if (dragging){ dragging = false; pomo.classList.remove('dragging'); } });
  })();
</script>
</body>
</html>`;


const SYS = {
  summary: 'Sen bir öğrenci çalışma asistanısın. Türkçe yaz.',
  ask: 'Sen bir öğrenci çalışma asistanısın. Türkçe, açık ve öğretici cevap ver.',
  quiz: 'Sen sınav sorusu üreten bir asistansın. SADECE geçerli JSON döndür, markdown kullanma. Türkçe.',
  flashcards: 'Sen ezber kartı üreten bir asistansın. SADECE geçerli JSON döndür, markdown yok. Türkçe.',
  solve: 'Sen sabırlı bir öğretmensin. Görseldeki soruyu adım adım çöz ve mantığını açıkla. Türkçe.',
  explain: 'Sen sabırlı bir öğretmensin. Konuyu sıfırdan, basit ve anlaşılır anlat. Türkçe.',
  plan: 'Sen bir çalışma koçusun. Verilen sınav ve tarihlere göre güne bölünmüş, gerçekçi bir çalışma planı çıkar. Türkçe.'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/study') {
      if (!env.ANTHROPIC_API_KEY) return json({ error: 'API anahtarı yok' }, 500);
      let b;
      try { b = await request.json(); } catch (e) { return json({ error: 'Geçersiz istek' }, 400); }
      const action = b.action;

      if (action === 'draw') {
        const prompt = (b.prompt || '').toString().slice(0, 800);
        const seed = Math.floor(Math.random() * 1000000);
        const purl = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt) + '?width=1024&height=1024&nologo=true&referrer=spiralstudy&seed=' + seed;
        try {
          const pr = await fetch(purl, { headers: { 'referer': 'https://spiral.study/' } });
          const ct = pr.headers.get('content-type') || '';
          if (!pr.ok || ct.indexOf('image') < 0) {
            let body = '';
            try { body = await pr.text(); } catch (e) {}
            return json({ error: 'Pollinations HTTP ' + pr.status + ' (' + (ct || 'tip yok') + '): ' + body.slice(0, 240) });
          }
          const buf = await pr.arrayBuffer();
          const bytes = new Uint8Array(buf);
          let bin = '';
          for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
          const b64 = btoa(bin);
          try { if (env.LOGS) await env.LOGS.put('log:' + Date.now() + ':' + Math.random().toString(36).slice(2, 8), JSON.stringify({ user: (b.user || '?'), text: ('draw: ' + prompt).slice(0, 500), at: new Date().toISOString() }), { expirationTtl: 60 * 60 * 24 * 180 }); } catch (e) {}
          return json({ image: b64, mime: (ct || 'image/jpeg') });
        } catch (e) { return json({ error: 'Pollinations baglanti hatasi: ' + (e && e.message ? e.message : 'bilinmiyor') }); }
      }



      const mode = b.mode || 'detay';
      let model = 'claude-sonnet-4-6', mscale = 1;
      if (mode === 'hizli') { model = 'claude-haiku-4-5-20251001'; mscale = 0.8; }
      else if (mode === 'derin') { model = 'claude-opus-4-8'; mscale = 1.4; }
      const srcText = (b.text || '').toString().slice(0, 60000);
      const blocks = [];
      if (b.sourceType === 'pdf' && b.pdf) blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b.pdf } });

      let sys = SYS[action] || 'Türkçe yaz.';
      let instr = '', maxt = 1600, content = null, chatArr = null;

      if (action === 'summary') { instr = 'Aşağıdaki içerikten öğrencinin hızlı çalışabileceği, başlıklı ve maddeli net bir özet çıkar.'; maxt = 1800; }
      else if (action === 'ask') { instr = 'Öğrencinin sorusu: ' + (b.question || '') + '\n\nİçeriğe dayanarak cevapla. İçerikte yoksa genel bilginle yardımcı ol ama bunu belirt.'; maxt = 1300; }
      else if (action === 'explain') { instr = 'Şu konuyu sıfırdan, örneklerle ve basit bir dille anlat: ' + (b.topic || '(içerikteki ana konu)') + '. Önemli noktaları vurgula.'; maxt = 1800; }
      else if (action === 'quiz') { let n = parseInt(b.n) || 5; if (n < 3) n = 3; if (n > 10) n = 10; instr = 'Aşağıdaki içerikten ' + n + ' adet ÇOKTAN SEÇMELİ soru üret. Her biri farklı bir noktayı ölçsün. Tur kimliği: ' + (b.seed || '') + ' (önceki turlardan farklı sorular sor). Çıktı KESİNLİKLE şu JSON dizi olsun: [{"q":"soru","options":["a","b","c","d"],"answer":0}] burada answer dogru sikkin 0-3 indeksidir. Sadece JSON.'; maxt = 2500; }
      else if (action === 'flashcards') { instr = 'Aşağıdaki içerikten 8-12 ezber kartı üret. Çıktı KESİNLİKLE şu JSON dizi olsun: [{"front":"terim ya da soru","back":"kısa cevap"}]. Sadece JSON.'; maxt = 2200; }
      else if (action === 'plan') { instr = 'Bugünün tarihi: ' + new Date().toISOString().slice(0, 10) + '. Aşağıdaki sınav/ders ve tarihlere göre güne bölünmüş, gerçekçi ve motive edici bir çalışma planı çıkar. Her gün ne çalışılacağını yaz, tekrar ve deneme sınavlarını da ekle:\n\n' + (b.exams || ''); maxt = 2200; }
      else if (action === 'svg') { sys = 'Sen teknik cizim yapan bir asistansin. Kullanicinin istedigini temsil eden TEK bir temiz SVG ciz. Sadece SVG kodu dondur: <svg ile basla, </svg> ile bitir. Aciklama, markdown veya backtick KULLANMA. Mutlaka viewBox ekle. Beyaz/seffaf zemin, koyu (siyah) cizgiler kullan. Devre, grafik, geometri, akis semasi gibi seyleri net ve dogru ciz; parcalari Turkce etiketle (text).'; instr = (b.prompt || ''); maxt = 3000; }
      else if (action === 'solve') {
        if (!b.image) return json({ error: 'görsel yok' }, 400);
        maxt = 1600;
        content = [ { type: 'image', source: { type: 'base64', media_type: (b.imageType || 'image/png'), data: b.image } }, { type: 'text', text: 'Bu görseldeki soruyu çöz. Adım adım, mantığını anlatarak ilerle ve sonunda net cevabı yaz.' } ];
      } else if (action === 'chat') {
        sys = SYS.ask + (srcText ? ('\n\nÖğrencinin yüklediği not (bağlam olarak kullan):\n' + srcText) : '');
        maxt = 1300;
        const msgs = Array.isArray(b.messages) ? b.messages : [];
        chatArr = msgs.map(function(m){ return { role: (m.role === 'assistant' ? 'assistant' : 'user'), content: [{ type: 'text', text: String((m && m.text) || '') }] }; });
        if (!chatArr.length) chatArr = [{ role: 'user', content: [{ type: 'text', text: 'Merhaba' }] }];
        if (b.sourceType === 'pdf' && b.pdf) { for (let i = 0; i < chatArr.length; i++){ if (chatArr[i].role === 'user'){ chatArr[i].content.unshift({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b.pdf } }); break; } } }
      } else { return json({ error: 'Geçersiz işlem' }, 400); }

      if (!content && !chatArr) content = blocks.concat([{ type: 'text', text: instr + (srcText ? ('\n\nİÇERİK:\n' + srcText) : '') }]);

      try { if (env.LOGS) { const tt = (action === 'chat' ? ((b.messages && b.messages.length) ? (b.messages[b.messages.length-1].text || '') : '') : (action === 'ask' ? (b.question || '') : (action === 'plan' ? (b.exams || '') : (action === 'explain' ? (b.topic || '') : '')))); await env.LOGS.put('log:' + Date.now() + ':' + Math.random().toString(36).slice(2, 8), JSON.stringify({ user: (b.user || '?'), text: (action + (tt ? (': ' + tt) : '')).slice(0, 500), at: new Date().toISOString() }), { expirationTtl: 60 * 60 * 24 * 180 }); } } catch (e) {}

      try {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: model, max_tokens: Math.min(4096, Math.round(maxt * mscale)), system: sys, messages: (chatArr ? chatArr : [{ role: 'user', content: content }]) })
        });
        const data = await r.json();
        let text = '';
        if (data && data.content) text = data.content.filter(function(x){ return x.type === 'text'; }).map(function(x){ return x.text; }).join('');
        if (action === 'quiz') {
          let arr = parseJsonArray(text);
          arr = arr.filter(function(q){ return q && q.q && Array.isArray(q.options) && q.options.length >= 2; }).map(function(q){ const opts = q.options.slice(0, 4).map(function(o){ return String(o); }); let a = parseInt(q.answer); if (isNaN(a) || a < 0 || a > opts.length - 1) a = 0; return { q: String(q.q), options: opts, answer: a }; });
          return json({ questions: arr });
        }
        if (action === 'flashcards') {
          let arr = parseJsonArray(text);
          arr = arr.filter(function(c){ return c && c.front && c.back; }).map(function(c){ return { front: String(c.front), back: String(c.back) }; }).slice(0, 16);
          return json({ cards: arr });
        }
        if (action === 'svg') {
          let svg = text; const sa = text.indexOf('<svg'); const sz = text.lastIndexOf('</svg>');
          if (sa >= 0 && sz > sa) svg = text.slice(sa, sz + 6);
          return json({ svg: svg });
        }
        return json({ text: text });
      } catch (e) { return json({ error: 'Sunucu hatası, tekrar dene.' }, 500); }
    }

    if (request.method === 'GET' && url.pathname === '/admin') {
      const key = url.searchParams.get('key');
      if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) return new Response('Yetkisiz erişim', { status: 401, headers: { 'content-type': 'text/plain; charset=utf-8' } });
      if (!env.LOGS) return new Response('LOGS bağlı değil.', { status: 500 });
      const list = await env.LOGS.list({ limit: 1000 });
      const rows = [];
      for (const k of list.keys) { const v = await env.LOGS.get(k.name); if (v) { try { rows.push(JSON.parse(v)); } catch (e) {} } }
      rows.sort(function(a, b){ return (a.at < b.at) ? 1 : -1; });
      const e = function(s){ return String(s == null ? '' : s).replace(/[&<>]/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); };
      let html = '<!DOCTYPE html><meta charset="utf-8"><title>Kayıtlar</title><style>body{font-family:sans-serif;background:#0d0d0d;color:#eee;padding:24px}table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #222;vertical-align:top}.u{color:#7fb2ff}.d{color:#6f6f6b;white-space:nowrap}</style><h2>Kayıtlar (' + rows.length + ')</h2><table><tr><th>Tarih</th><th>Kullanıcı</th><th>İşlem/Metin</th></tr>';
      for (const r of rows) html += '<tr><td class="d">' + e((r.at || '').replace('T', ' ').slice(0, 19)) + '</td><td class="u">' + e(r.user) + '</td><td>' + e(r.text) + '</td></tr>';
      html += '</table>';
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    if (request.method === 'GET') return new Response(PAGE, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store, no-cache, must-revalidate' } });
    return new Response('Bulunamadı', { status: 404 });
  }
};

function parseJsonArray(text){
  let arr = [];
  try { arr = JSON.parse(text); } catch (e) { const m = text.match(/\[[\s\S]*\]/); if (m) { try { arr = JSON.parse(m[0]); } catch (e2) {} } }
  return Array.isArray(arr) ? arr : [];
}
function json(obj, status) { return new Response(JSON.stringify(obj), { status: status || 200, headers: { 'content-type': 'application/json; charset=utf-8' } }); }
