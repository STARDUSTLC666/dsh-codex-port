// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name }));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && row.enabled);
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 2 };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if (record.uiRevision !== 2 && !record.migration) {
    // The first loaded participant may still own a pre-footer client. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    record.migration = Promise.resolve().then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 2; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  function FooterFrame({ name, label, subtitle, actions, children }) {
    return h('section', { className: 'dshw plugin-updates-footer', 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:28px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l3,#e5e7eb);min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}.plugin-updates-footer h2{font-size:14px;line-height:22px;margin:0;font-weight:600}.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;margin:4px 0}.plugin-updates-footer .updates-options{margin-top:12px}.plugin-updates-footer .updates-options>summary{cursor:pointer;font-size:12px;line-height:22px;color:var(--dsw-alias-label-secondary,#657080)}.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:4px}.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;padding:14px 0 0}.plugin-updates-footer .updates-note{margin:5px 0 0;font-size:12px;line-height:1.6}.plugin-updates-footer>.w-section{margin:10px 0 0;padding:0;border:0}.plugin-updates-footer .w-toolbar{margin-top:10px!important}.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}.plugin-updates-footer .w-switch-track{flex-shrink:0}.plugin-updates-footer .updates-notes{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:10px}.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:240px;overflow:auto;font:12px/1.7 ui-monospace,monospace}.plugin-updates-footer .w-overlay{z-index:1002}@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}'),
      h('div', { className: 'updates-head' }, h('div', null, h('h2', null, t('版本与更新', 'Version and updates')), h('p', { className: 'updates-subtitle w-muted' }, subtitle)), actions), children);
  }
  function Panel({ name }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false);
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function install() {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api({ action: 'install', name: row.name, version: row.release.version, confirmation: 'update-installed-plugin' });
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (!snapshot || !row) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state), pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy), installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const status = row.sourceKind !== 'registry' ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查官方插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) : row.available ? (prefs.ignoredVersion === row.release.version ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有新版本', 'Update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    return h(FooterFrame, { name, label: title, subtitle: original.name + ' · ' + original.version, actions: h(W.Button, { icon: 'refresh', disabled: checkingThis || row.sourceKind !== 'registry', onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : target === '@stardustlc/dsh-suite' ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates')) },
      original.bundledBy && h(W.Status, null, t('此插件随 Suite 安装。以下设置与安装作用于 Suite 整包，以保持组件版本一致。单独安装的插件可以独立更新。', 'This plugin was installed through Suite. These controls update Suite as a package so its components stay consistent. Independently installed plugins update individually.')),
      h('section', { className: 'w-section' }, (original.bundledBy || row.available) && h('p', { className: 'updates-version' }, target + ' · ' + row.version, row.release?.version && row.release.version !== row.version ? ' → ' + row.release.version : ''), h('p', { className: 'w-muted updates-note' }, status), !row.enabled && h('p', { className: 'w-muted' }, t('当前已停用，更新后仍保持停用。', 'Currently disabled; it will remain disabled after updating.')), row.checkedAt && h('p', { className: 'w-muted updates-note' }, t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN')),
        h('div', { className: 'w-toolbar' }, row.available && row.sourceKind === 'registry' && h(W.Button, { variant: 'primary', icon: 'download', disabled: installLocked || row.loadError, onClick: () => setDialog('install') }, target === '@stardustlc/dsh-suite' ? t('更新 Suite 整包', 'Update whole Suite') : t('更新此插件', 'Update this plugin')), row.release && h(W.Button, { variant: 'ghost', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')), row.available && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')), row.available && prefs.ignoredVersion !== row.release.version && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') }, h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')), loadingNotes ? h('p', null, t('正在读取…', 'Loading…')) : notes?.text ? h('pre', null, notes.text) : h('p', null, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')), notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每天最多一次。只影响这个插件，关闭后仍可手动检查。', 'On by default, at most once daily. This affects only this plugin; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      snapshot.pages.clients.some(client => !client.fresh) && h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows'))),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')), (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      prefs.deferredUntil > Date.now() && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      job && h('section', { className: 'w-section', 'aria-label': t('这个插件的更新进度', 'Update progress for this plugin') }, h('h3', null, jobLabel(job)), h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁更新', ' · Automatic patch') : '')), (job.reason || job.outcome?.result?.error?.code) && h(W.Status, { tone: 'error' }, message(job.reason || job.outcome.result.error.code)), activeJob() && h(W.Button, { disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')), h('p', { className: 'w-muted updates-note' }, t('安装开始后，取消由官方包管理器处理；已落盘的写入以实际结果或恢复状态为准。', 'After installation starts, the native package manager handles cancellation. Completed writes and recovery are reported as they occur.'))),
      dialog && h(W.Dialog, { title: dialog === 'windows' ? t('断开的窗口都已关闭？', 'Are the disconnected windows closed?') : dialog === 'automatic' ? t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?') : t('确认更新此插件', 'Confirm this plugin update'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        target === '@stardustlc/dsh-suite' && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        dialog === 'windows' ? h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))) :
        dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), h('p', null, t('你正在主动启用这个插件的自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for this plugin. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('不会自动重启 DSH，其他插件不会跟着开启。可随时关闭。', 'DSH will not restart automatically, and other plugins will not be enabled for automatic updates. Turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许此插件自动安装补丁', 'Allow patches for this plugin')))) :
        h('div', { className: 'w-stack' }, h('p', { className: 'updates-version' }, target + ': ' + row.version + ' → ' + row.release.version), h('p', null, t('通过 DSH 官方插件管理器安装。需要重启时，由你手动决定时间；停用状态会保留。', 'Install through DSH’s native plugin manager. Choose when to restart if needed; disabled status is preserved.')), h('p', { className: 'w-muted' }, t('来源：npm 官方 registry，网络不可达时回退 npmmirror。安装前再次核对版本与完整性。', 'Source: official npm registry, with npmmirror fallback if unreachable. Version and integrity are checked again before installation.')), (ownPage.dirty || snapshot.pages.dirty) && h(W.Status, null, message('page-dirty')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: install }, t('确认安装此版本', 'Install this version')))))
    );
  }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在页面底部查看。', ' has an update. Review it at the bottom of its page.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: Panel, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
window.__ModuleLoader__.load(__stardustUpdatesWrap({id:"dsh-codex-port",factory:require=>({apply(){}})},{"name":"dsh-codex-port","version":"0.1.0","hasWorkbench":false,"packageVersion":"0.4.9","label":"Codex 技能移植","labelEn":"Codex Port","suiteComponent":true,"sectionIds":[],"iconData":"data:image/webp;base64,UklGRlJaAABXRUJQVlA4WAoAAAAQAAAA/wAA/wAAQUxQSPkYAAABDAVt20gJf9zreg+AiJgAfm/Y+qyK2jMsGVdcFlyvZOWqeM4dR+wmdnnOSSg5cAOHrDlgl0CpKGmFyHICBMirfhl/1PYZkrRt2y8isruHq0/btm3b1hinbWvNaducddq2z77Oc05zdI4903P2nMPO0LFWZWRkVGVm1Z9XRMCibadqdEkKgqUM8ggB0fmlHEmSJMl5Lw1gBByCLLCAF2hZQUXEHt3pbh7Z+F0RQQuy1bq1tCJbfsQykRAg2efOfFPDN//3H/+EgXHOheCcsUZ8rogE9yWDR4I11LBUJnddYf1t99ht+01W7JKkQvCG6ZPEtPTu5zz8+ch2aQHo2cPfH7J/K7FGeAKLGFGXHa7+ZBYcY3XFGCcJE29ek7hocOCCkdhyyHADQMexVJWwitFayVhZzLumC4lG51rmtO9UEia1yTRaxxo/bUmioblWuWk6rImVx8faDI8YCw6kqEFBcFrtng5YKY2tmBT7YJ2jGPN3J9GYfGmxaztgpLIp47oSyjAK7ZsRb0C+jI4aXXEZG2Q8cFIlMawLsYYjadDqb8FKTzXzxOdHOhUxTiPRcOI85V8o5WtlvMHpX/G1wgojWxuLVYnzRWhpM8uYPwHW+qOTGNBQrIg2/gOxtl4kUpZrpNImowF28SGxRsKHz4H05qyOpYXX6FhlQtu5qxNvHHyyMV5Wic/CP965/5qLzznv8jteHtYOJP1RBsU4qmEcCjo7+TUPlMH0J05cr8knjyy37y2/G2iVhesbBQRdAKV93UyM0YOWIpaIYVHFCFf90LzzCxrSTZvWTsCrDQIRDUxzqkFtWz7RN3GWoX5ijHb5Htp48VX6RMYrl4cx5wc4q798QGpcbVL8fA9q4oGKmOimhDwJ/D5VbqOsrBairnpw2qIDys+3EOfBlyiiPspoD74h5qrhog173TT0vS+/+fSlW0/Zrkd91c0xWvx3SOvlhyocrn9lzXQqfHiNOKsEb3HTz53wGDN+6KHdiIn6aT+N2O++j4IaDhGlKhRxugsy/bWbqUnQVi8rwMo4lomJYwOL0ZctUS89BfWG9HGMZ0LYycGWrc9+8rNff/ny2cFbDodKXaODKWq6XUMnGhqvQCa1xYRejPG66Lf8RCiv+/uexINcm90+XKcUsJj2p+ulMXdb6vEWlEzC/AKJtZW04PWliNdDv4e8fgrjAiRpJojt/V4MmFhKlYxEvCOPuZ98iVh7x+c+LZWS+Gt9zx/BWN3ibXzdSCUBnbuQCOB133/NQdZRqzPSRwM2Ja2aaapzbm7yesRTc1VOu12X8Jw3PMZ12cpUzunMeXj+ElMvelw6Rkvl1Um4k9Nf8bngwu2AhKvVqz+86SKrfX4/VLrLzIQt/hK07Ak/LsjUXMc4myrnr3T2i22/fvv8BVtz4rzexHIvYp+f2Y1EJi/3s6uL2EgMhTF7bNVyagfcEbz+6jBOor7EssRkKF+MQ0lkpqu1DZ1Ou3IjO4YnUGNiJIqbRCCx+HgdiuqKfagvXGPBxtkx8rcQmzD9c8CMwWhl4Ju9kRId/UnUE9yJ2Gc/SyIzWRdlsZ2GRhirPMejSv/MXaxxdR0hRp87H1o7Zx+YBU5rdECbqpoYHW04bRSP6gJqo5I4lUTd4O7joFKQGNndHwsXzXTjK2eYyfgTkwT+iY3RWh9Aol5gxXboCifoxGMk/IsOGHUZ8e2JH0BJQEZs0bsMEmMqOq06IXWs2pGGjnFOCs6qkqZ1DzrstHhqQo5ztmK1GQLBWEq8a6oTH4tV4vLgqBSYoCUv/i0GkNnBKCsCMrkstJTRmLxE3fi9H12YBMe6YJx6T0IyclQB/K5jhGhptKFw32L1QSsh6BFPRDEud8oCoy6PwsYyGVzVBOZIGI24NLUvMVEPcBCkR+z4lHjC4lV4ZpjgPjp1Xsb807AkDd5ZiyJW/gD+TZq0trtTcyV0CDrDhA3nRROkEraGhB9z+taBURinnZVW6brw+0oVr80XGm0ib+uR0tiQ81RQfE+p8Vh3EuX3Oh1KpmnKoFZ6wmmJJkpBGRIkEGgyLfHL2hSVn06TkFIbd7JxzCNTEWwPKw9jwpA+vuuTtRJTd6oHtOufjlotIQn4shGY0eNounqXzReJzJa1CS3oRYKVnroO/MnAumfFJmvwCMbbK7cwi5EAmHClcUYd+AKnaKf+n0Bl5iESYy/miJHSKoVzyx/IRETbj4VyMq9KdO+maOWTYbTC+eWniHpp6Or1SwHcTYPQG3khh/qXnQTtrYzXzb8YHaEHXfjJvbAy8uByf4HTxjOgqlCpgpDqAiNpU0yK7Nxdy0yMevwEmTVWzAAjzQDUBs0wEpNWIV5iv1vQWa1vt4snkLmBoRpIoLU8g973OGOl9dtkodW2BioTe6pDTUv9kGuoFN1BorT2w9We5Ks6jLdS2d2FJppTOK6kxGiFmQjIQC8GHm+SqWh0qZYY6qiTAoWpqxIvp90v8zu4bhLea3v0qNybLZZbZybxdlnxaP4QFciLicbno0yaTBTfpTzz/aqQTR7rYYSZaotAJQp11fa/jYiX0ftjyCrKizZD7RY0O8F239y0EMrHHKK3uta7xMp48DJiX62KXKZbAK27IA4zgSvXfjihE0roFdEZkGb8XNEK3o80+k4nCOkUCv8sXTonb6KtO52IyBQqcR7+pMN5aqnLgVnzUsR4sGwWZ+zcWcbYGCXXKQVgoFNZpxK4HfFyxbLEK7AmI2NFj+hgFmbjWVuIclfqJ6cg8SaxUvEvf5g3C9J5JR8xWBPKkztmTJUJskhPbdOuGvuWyItR8+/fvvZ4eA/MMtYmMya2ZNK906qtFL5iJbKdVUfGyxjieTj3bKFBNw0mrKzMhgr1Ko0laL8QXSME7gZWFZgZmoB1P7M/uxEriZ9oC1I1R/aEKCJ3UzAgQ/0ZYST6lsQSdEh6ySU76rtaUL0Bzfz1BgrDorIcD0UMhsOUhTk1Pl9HptpijKnQMaWwGHUZBdW+WpyzdS4zxgss45gJWhaebhMlUbYrn2wArCSIIBZp4JYgYXZ0GSxB+0B5wA3JzqtFpK5d/a7MY/pZ+K/LEbK/C3dYGIXFBCz3T7GdzIucIjnCZwmwSxDMGxXs8hhbgRMzFpG9QrwE3qvPhfZGxtKgJvmOVqKWHRDuCpkCkxRvUYrhZxuk8TJCUYA9Xli5/ol7q78D0laP9XgpDk9HrF1qv3BL5zvwIaxtBKJhp3jB7Ja28zcsvsWo6Ts84VBJ3vMavIYnoTzTcJzWmoi6Toef0iYMkfwChUlLESv8x+tVTTjsxN9uGrb8pKSQZWyb7dgvidOLbnHawYbrDZferSG17BfSGBxz3yP7MSq4Jehux447U6CBTMvMd8lGFWlEa5p0OrDYFqOWv6G9fWCvGBOjNSno4KsRMC79LDolexX87PlIutkb6DQpRB3Z0o0Mm8a8tYkXGo8nMTc9vUBHq84o550TKtb11Fzk2baL3FvK4MKqUwdk9nrVq6wsYPd5nkMQFs25ohXGLU5csMKute402i9xREvpcNpSFfM8jvcN04UdKlTV+P6giEiIYs63jIHKqP14eR4LczcFrKpG9scjPSaNzkyzaothA5YgYlHhvs7obUj/X9vyBmfk5xgB/27JTV1lxwGw65KPSKw5U8pi2l2bi/Tm5wU66XTE1obKfuJlYCWldJsJ8ry9LN40g4hUbdpsBpwwG9JCDrt8q1b3hsDC+K0/GypcRy7iHodALmq6YOKOW22608O+aC7X0gBqyhePDumzNLGi+L0HGTyl/hOdOa0mpDJmg7JN5MNv43fEBoDFhILs8yvoJKR3UQmWft/ICJlz2WJWsMmSnVwZy058Q0VwMlpyNFSWplTQEq19GMPzLDAcHXtskmrXF61DvAj2EMQhHZ2ZEBMWRiuIpC7STlR74lR9jtm8AGC0yizoAHYykJmDGe5vjws3kwtGdNQX91uNaRVdTCEW2cvQv46gaweeFuPpdbQ9N8A8lY4YzxTCXnoKwnuHITXUEpTCyZlV2vlgOJWpjdy6ABB0OmQVsgEDVYZaQnhrutEI6/dsMZ24rRB2049QVRYKV0GNshZbFB9DsayqQItGpTj8cVMhwndJfYe6BAC2JSv4DghaDRIsMYavWIyYb6jmOOhK95lu0GuhuQu2VIyfVisCM/ry57cKqZhRJmlnB12ed1pvqqwz9Hi6WyFk7oh+/db9EfQbGxus00Y2W5FlMKEP8SIwa6LfjkethKolWlG1w2oGTLbrRsdVxdikJkn6Td9UILUHN6CMV0fbgnlW+D6bkXiGoqgY483mx50BV7OTFcOUtTavtgmWjW12jD6F2KSKR7TKZ8jYP5Mtz+oqdlFWVis5W8GlE181EyvEaQdOh7QT8ZpruM0QjHv1v9W5W3RESYURqxZB3BLU7TZrA2aZPfnhWSMIIXxbG3lAmQaAeX0l4kV4euDef0CpqnJQTSbEgUT7AiI2xjVYwc9bTvnf/dvlr20VjNGWb1V8tamS30AWcYkBrOipDz89Ma4gkb+8wal596GLoGRW/blP9i8QdV9F9leJN6hJ5C9p9/3LQktvNxCx4kizMpy12affKkV2WI25+c88CzoDRsusjp9VxxZa+GVmQmagYZa4gaK83d3GoFObELAMxtx7J0ck0hYL41zclBq534jMaY0FNqgnUT/z0kg6TQ4c5sMJW1A9Eh8QZzk/UWSyu7g466JewAYGTEsaoqs1GOclmqxwJUUsX++7EIeWloFsBlbDR82JWu5Qrtk0BudLjJYbk5a2M8pDFASl8tk5FXJJloaQWqLRGufmO+bmtNU0KJVZQeiXaTDBN2hHy1U2gyqiwk3ERK5e637tPDQjs4G8+oEm2ISfS3ZZMBPh7EeyFEW5OpuOabNwRMPaYnZY0NPoy2pxCXSIGH9tmC9xira7aHhqkeXuCDroPG50/dakkoGEDjutAomOQ3ONngkm6DjErhAVJfcwICF9a3iCfS7Rggooq08hke/vCv4hOqXWnWGfMyWlxX+GeRUsmFLOGDRfCWzZz2EAVJs7OZv//ZXJOrIcnKZJqLOWuDZn4tQ8uK190dzYVDd6wqGX7475NqY9h5QbOjmmQmdSlC9xYstuuPQtiL0TT9EkUdpFkq8pBsiXxiQZFdL6oJwC3X9KouUlmFTVgNPvOXHysZn4eWETL/jCSb6AGfmrITjnjPf9IZUVaFkYe6zRhF5Q8Rgj8SFnhZh7OwbKyj7PpkJmcqdACwd21j96nlliBlktqzCYRAGmnlv/ggoXBkHgl3WGHbRun2zpGULjn8WJFWGXSVmdeFm4XKswAzP9toblwtfQ75a4MHcron5Qme1douleA3Pcy3qqs33IgM/5yvCuOVuCNupAgLJbaTqUyEk3qh0Y0dP7VQoPBBX2ytfitMyvUMaGjyToEMPWcHYi4KfsqwTeL8atuYKzlo8hszNP12z2DLVXCF/Ju7Eaj8SnxHKVPJ9P32m+MpFAQmnkNfmqtqLLmdX7OAejmvIjzsQTkNVrUqA4qswbqFJ2T+CVxvQlc0NEzc8Hc/N//cFfsQLIL5dKmLlsTmARLfkR4hosFkHhnh9TZzMRLHiX6voRTFsiHwhOe4/xunXtgKwrkEwKl7yMwOPrbRSGR8Ry8e1yq7HKc/GmzIKuCc0Wp3fm1ftRSLxLPBfe5hfv5IPCwyOhayEVjdWtRjWLgxL0Wt3tj//ZcLXvbwRdJiG15zTbufNwqBrof2eI5QSmZWnS8RO2xqZxV+3lLsbEwxkzTwp/dv3Nh7EGkni+ozbxMxPwZsaFKl1F4TdGrNbMn0HsZqdvOcv7kNmFSvatNXoF68jvK6XG7OVrDUF3O7Kmv+7eR9d6umAQFdCb+YQBMb2ZdaF2LVLYGRKPb0G8xnwElDbW+HE9bbrI6KowzHMsMqKxwOMpF/YwJtVJhZ1J1FjLNALKZOIWortCRVC+aUQxX445f0Voj6IV2d2pthB0litsGp6llqY3MsbfaUeD1cIXHLMc5pqNS3cPG71ZTQ8Y8WGpHtZc1kLLvQJVu8EPPcALgqA/2VuYcfiIP73ktFFsdUjijz0uETzzwMysMn0eb0/4Lm4ld3kwormmiKhXWPtiFxkb5OYvwUW8Rdt+bt18xf6y+G27ijWzNHYgUVNc7oZo23tVWKgdLsMhGDfTbrieYH6eMs2QQhoR41KKanrmjYFjbX9NMK70TjyExmwJvNMe6GshEi/m8qFnFHUi2nGUxG4FIyaRJ3NWcTDtSJySoo2I1fLj+Iq3RvtlmTXqdIOUivGhlY0cZlQxG7NqOifninyxpZbgtPYCaIW/Vp4EHSo8Q2HyXTsZDWYoVwdcY/1S3FAK47oRq/UGQwqjk58LvdfkLPoaI/Q4HXvO0lRv1crEU3ONBY9djFZGbtoy3JlsNt7I86KJ/gysNOyYGcnG8sTTlzUed3K6EnGMD2m9mSlJizQzelLGsh3uvb+5OvH0BAmqMT0MvRDvHl2FpBk9KOFNgYYZH82M5rRagzFx2VwYi6p3ghH2ZM1Wvq4R912iPPhP80PZbVz7OzEYp1VvGiGlrjW4A3lPSMTzZrssHCrGvCMTkbvZCN5PsGLIvigQtvy81z2wfffk80gKxrr//rp65Yy3pFElzIzqiDsFFE/+ByVIfJLPYovg0WfGAYou9hBTTRGTZc6oJYZf499Ncll5x+nNUC2brfr+J89YdcEyXLhwzXc7OxCIfF6uZCLYNEN2ROxkWF++tv4OPJELOG2LkDJv7MI50FWjdROQsMPbz01c+OJteRJ0PZILBB0bdKzw3q9QIUgsx8iTlgsRRLAMVnbt4sFcEFG/IGj0HQXlO+wc1tdIaqmd63+8lLVapXBvTuidgvbbYzfzSeIuHxghLxG4U2DK8Lv6L2kjbsvpYO90A5Mxgb9CB3S2TEArbCiNLVF6Aeyt6mwQG7kzRjmdssp/mWMu547elilQwXUrB9Sxb5Rrb66DaFBbhuS16vCbzABrtVWHvQUZmhfhWdNHbP+xbsWHTQELj2dOLqMoH7nzkqyZ9yS7NP4djXBJkIoCPQR+YQ0V7cI7d8xQGre6IB8wWnpsSu3oaSys0TqwfSX6guwQZiSgAWuBfqcizqKI8rGOgQr4a3WYm1U1Wo5icIoMCdtXP+GU73mUhwynUpTXeuub3IVH1YqH2pr2lucg9iOlwjMSpZUKQf+8wDjd7bxVapVsNGfDZ/iShTHmnAcCzFKPWbnCwvEkKDc6uxMyAzgtMmjlq7OTpETFFEAhx/c1Y4K2/BFxMA+JuWPWPnrxSQD3zyJaoQ22IZ7nHTetH0HqFKM+pEO/oAGiodbmYh/tzdniMhUD7csRozyp5RFYd/exavJQOs0bk+bRgpKNVIyUiuOTfsnZvO+8PXo0rJXK+wcrc7E+fLaROGyMLGXGTWJfuhV570BHPXp/rQCdzqqRvz63HBNlO2+fop3mXu7EyIL2/LfeZc7L1F/0vgwVp/L/aZZUTHPD5K0ihVT+4GEYzHO/+ZrTs4GrUarvPjxH4GlxDYRvU4MJ5jD+ooVYUd40YsWJqSdv1IY3igDxOkTnvuL+nwK9lougg7WRmbA1RJWTVXlNskhy57/WIk5UHDquE1KbYHYOZJXuz8RaHePb5UgQFYl2HAMj0x5KSqmDlQcbx3qS6ZqPOFJhhed7kijac+eWuG0OLLRMzgUAW+OcGmNmICa7PGqpHUnC1vy2DAl9UQFfUI9zWvnStjlwzp3yUL/r/4CsAaxOZigFK1XGg4MsACD9Lu9SJoJFRi0OvL5SYuLezqZDhSNR8V9pr/5nn3biTq3Eaa1JkFWOyCeJugdomAJG/Jt+F+eftawssKDt57HT50qkjecyyPSrzUv3YviMlAb2qWWK+n6GPGK+JDTRttPTA/MAaSQTUuoAPbS3mqnYAL/1a17n2mGdsHDNwu8uXZ94j2XW3HTng3pdcO0dQ9/87KdRk2cvMgg0TrkGAP3l3oV+WV8uRBQJp1ALWutrmFiHQEtlPNAq1oDTZmutPC13qh6mnhG24N2jHBlJrH/CVQ8OfW7o/ecfvFZI3okurcuvs8Wu+x/e96wLrrr1waeef+uztmE//TV+evuchdJaoxZM+GzINrwk72fpUHRuO5Jc9jQFTs4auPns1g0Li5/Oett6CpROEiTdyqWTxKjfr1/XEXAr5TpD4uXOXWCVS+1c7OAtZHhzzyWWXmntjTffcvNN1uxZsjc15pxWvHIMLGCUTIxK/ZcpT7w+25PN8fBH9m0mvtXVH46aNK7tvjenW3iNHPXiBVs0UfpxoYyLSLiGh62HSV+GVOo4YwFNAy/Z6+cx6nngbV9OVeky1f7j8xfvUrn6S+959k0PPPXEnZceu1FLqghRl8V7MKIldh5w7QPPvfLqa8/dd/0Zh2zUzSlhuRYV5hjumDK+vrxbVRbf7IA+p58++Ph9tlyOuQUyaw87li4QLLs4OQlidf+fDGJZ+SiYk5oou7moFA9KpSgpI5mNSZ0PSnVHSTY2fPO///x7GgIAVlA4IDJBAADwrQCdASoAAQABPjEUiEKiISEWrJ04IAMEszdwuPB4LA/2HYnbm8Z/ZP3D9jusP1z+t/37/Kf3z9uPlF1F9geU1zp/wf8N+7n+t+ZH+R/4/5afKL9Hf9n/FfAB+rP++/w/+U/YP4yvVn+4PqC/qv+C/6H+n/fT5fP9h+0Puh/uH+2/az/b/IB/Rf8F/6PbK/1v/z9x39wv//7gH9I/3X/n9n//qfud/2/kz/sP+4/+n/G+A/9mP/B+f/yAf+n1AP/P6gHAT8Ovv3g/+OfPP3X++/4v/I/33/3e+z/meMv0T+Q/4/oh/Ivt/+B/vX7W/4b91PlT/UfbR6L/Hz+49QX8p/l/94/Kf/A/tj9b3xn/R7h2zHoC+vv0b/H/4H9xP8b+7PtL/4X979VPsf/yvcB/lH9K/zf+F/eT/Kf//64/2ng7fgv9d/4P9n8AP8y/qf+1/z/5S/TR/M/9P/V/7L9sPbL+b/4j/l/4X/Uftv9g/8k/pH+m/wH+d/8H+S////p+7//3e5D9qf/b7nf65/91BwBfgzHefhRvqAtw5Xgc4MR1I/QxhYpKFEEgnk8XMd5+FG+n5RDJDw9pjL9gKaD6tWcBJwy0JbhLRea/IuKaMCYNBrU5Ef16C3+DMd55EV06t4HrB2rLL71Qcy6160DYqCE9Q0XrctJoaN9p+gIcD9nWssUFKoT/9N292pP9x24TEBYifZUQjRymq1bC+wlapHIpUuFrUf93t2K84pihoX6htNaFdX6C4MgnJLoU+mZflKw1tckJPLt7rypdsPZQdr/vGi0L0VVzJKpqtNp8WDvaOA2XT0oVdB92svjmYRC/k4jKGyx0IbA2Acg81685t4a/Xsf+TuZXbWbCTvPblWjFgDhiDTTIKxvp3oSRBWwWRzoGDF74i2vPBw+NlXKPsCTakwc9KFh6Wlk7/4DzJEsvURHmsHy7vESM3HoQc62Jd3jrMDhGYZ0i09nFP01oin5qqCc6z8ETrn01rp2kjsz2cjVH1jM5LJ9wER4y/b2bWvPXY3SyAla7GKNFi6Y2DC/0F4EISXW5sm9sU+oPEPGmHNvi3p9cZ8BQzL3ePOC4z8v7nArmut++mL1GbZhfEsPP7Htpu+Vrwue1RreHAcmKB93K2AewgmdkkptWa8ZVAGh40hBnjhVW/uYTncbnyeE4Tc3ad+AD6O+g5exCdd5DSMiw33sy53fssfv+/abUlRjHyejt9amtPRMkUyuh3k9TY/yzcPNCCMDRGabWzoUhfba1Y/MAyoPXBbbh5kXILbtcBceTLjPPi15rNa8m9nc1MbW8YFA/Iz1mNpXHXfP5iGz9Sn5om6Ww5Y4BiJdCxBBCSXQQxPfxixynB3NfsVI/OMCNr1N+JkJhV1UmHcWR1zdwQAPSLJwp/nFXvGKLjdnqS9SdSn6R3DyHUxAIegwhfOY7HK0ocl8MZ2BA1MWMrJZOb1R3vpV0h/ldoY9aar+FtpHccEEznXqHb1NPT65HqYfNKqVxbs+mXu+cl4mBH+uqfZuESxkpETWUoWQzz0tRMrHwiRy76BiCcgaTxu8qLizZ6lA3GZVOlyHwXcRAn3GfRCev3mYuvVebSFyvea5q7ovj1xDcnXUU/w1alaqE/saC6Eqav6P1U1jwsQG5ZnAgO8/u8Y03w3g1zywSlqvn5rR4/zgz0TBCjEYbcjZuQWij9gIHlkhDKfctSUfDQ4GRRRyu9MUQTL5NzDbvJkMDk6xJ8ZA25bPRL0xLLBkOYQ7R02fvceAwdyKed1K03k3tSayQ9duGsc/WPil9b3tdognHPwy1Sv6/cGYyxf/l4gAS9YQJc6fjMPhObPSnC9aPHwZjoHmeVkX4Mx3n4Ub6gLb0AAD+/9JAAAH5kMqfSivK7R8+WPKadZxKDTvLuaM72OY/leiXzP9f3MxqTqUSbvpVhF3aGgS2or12nZpFxtgZoImPWuIzkvC7myr2Mv8+BhQ8D3zrUwQCanr+MEY6vqfnDXJ/tpl+mwBFXFQ4Y2STh5LZN9d4axp7/H8hngBgmsalDA6L2Ue4cXOUdv7i9PqxxjzbUOfb2u7rdYt8gd9p7/qH5FNYOB6lCaEQfnps0AsqE5XOdjMjJ3yNUTeaTNOGorIGzwxhgLavJHJI+TLq1TURsFqVbc58q2MUTpuPI/8LXBkirqN2rkNNObXwABZ77wqvcmmcaXlu2+Sn3Zd2tZvBJU/4lljRyU1kVNwT2/fxuNwAjnQ83etoQukxWNOoUx6m3ixIkxsiZZy2WAs/xdso/wiQk4938t1KId7IEJX8bOFqC9QSAw1mNZc9vaZxye1av4zT960dIdXJpgtaS3htc+qj9WwE1FGtrFsbb26h0LDSJUqWBtgvXKRvy0FFX4UvLtffi5uC0HVKqG6q31/cMGOj8nmYRNosiJvXf7GK1Qa+0Pr3haeZD12ahgozdef410OcYJ1Rrg0ajJBI9M/l1VIpUxxnKbkfGg7HiOZ6PygL/SmHxsDmimlT9O3R15CtgJe1RjmNBD5BYVuHn7dxSpIPHb+J7mZMCyW74r42YeGEC+IsoZ7U/FzPy8r1GUbXCkjdzxSx3sly+VzREco9dsUknrvD+gqj+Hh39JrPiQdFv9V6nOi0aXyq/9Hrtod+46IDZyEs4HgW+StyU0Axb/lMUUV0aRfxfIUxp0nEdadbDpGqB14Yy5vyIat7k38wVc6eWkZpPVEVwMeTq/iPCPNcbfyewYSjqOogLopgdlXF+z6M/6s3p7PDESKumY0ElWR0lyS65XzVrp0rI10MmBfyxe96uO5q/8oHRmcQfFMvZ89VlsWieZlIL2idDu2WxnGXOZvW0bcCgBoaBotdin1Jqz51BVZde2KYAb42FS1+Jo+AvK3OnriWPUDQ8T9501r/gx2X8Gs1nSF4AHDd8v0o8i+I162LDyDTzuEqI1ycOaVNShUiv7T2ux7PNOlVlbtoQk/c2KS1Dd/6LY33s3h9vx4ITbAaTeoQzz9xnSf4t+d79rwLOEG0HamX7KgEIfNRinplkVQa92hz5s2ycC85Boinjsoc7cD0aioe1UlgsvtyWxA3FOwTWQzDUgfe1rNEfdHwQD30Y2kRsjuK4ltBxP1Yn5JiEKvai7n7chPGTlLGqE1RxMk51YD0F9HGJ3Z/C+klqhoouA5Z4jM8eXsrHhrg21djXmfDUyOEbxijsBldAO3rshDT3km6a0dcxmTh4qUiE0DcuySQtTTmRKpFWHcOrNVbRWjD2gLzBommuj20PfOeJ8lD+kP6TEzunyRRxv7dSZ5jTex3/nbb/twqj2yEU5jJ3CbewbVI3aXwMpIB+W++ypY5m588v9CcLmuIgu9TdVvCUHa7pSShnGRL5nS6HLtemRb6JhfOD4Ob28l/umplZDJuABhwIyQzQyWEEu69sEWq9Ht4WXE2qs71svfqMOY5uvdBOzKy7kbmjKQb+Z5G4Lw7H4ULOtBlr9gxZ7s0nS9+6dl9NKUwfrisT8H1R9bPc6kPIsPPikycRDAiIwYJ2dPwtyXP+mzH0u4HCxGJv4zzcEEOvUZxN+kcIhjkYKE2W6u17A7eA0QS3TSIbSrlPxR1bw1GiOlUPODDGnolhNW7zU74bX+XLU6viqO6ky8F9NY8qtPqLlNHxMZiKeJbJHec5KvAB7jmr5SLFpmY0yTYZ/wT2e4FsZiGYRXuSbDDfz+V0XN9cYVppnifxiDZJwPKiclbKUz2zUCEBiSSpofrVvkey1Sk99i/SKANBbVwTSxBoobbWGPQXbSid1AGu2FrI9SkFoVNqjt9QUuCkgwzrmfyGasQhzdvkcJ5YYvlRPOYVyrsrmLKOy9H/PycVGVIqhUC2uftOQ9DAFiO0JJRvq5ZLk1pnDfbe/FKrsIlHUIs5oYWa84Y0tCYT0yUKBjq7wZsbzT9pLbvI8BPLwLntwANHGjKIpmxKriVuK60ZVe4ZNH44SYVkrW4ZAeIXFf+aOdfl6DfCcAXTjySMinZslph4L1T/1RCbxqb/WeR+YuTr+vI5gpRHQ/W/Qsqgx6gGS8wdMqMM/ia5OwBncLppzbA1mjGr7rviqX0o27n3mX3P+oglQ0PFkwADi0FgwbbUaM8dkA5R5hx5j4QB0bzDm64CC8GlTkS0rwMp8Oe/b4g/14n7oBFi3lOXSIEXneLBBB3lVxPe5OLm2FIy4KEgBqD8gzkB/ZfHAsMYKryd3fh2gVaCqEWDF/obGSo6clSXlbmzKo+AOBKqdbwwpHc+Gl/IzJf7+q8Yfy5Z0lhEWG09zXv7wr5f/mwYiA7OtJpxY3OgHtzSrc9nHuSGKqVvlH5U4pWMrew5yDD2/9V1KZnLbRa4cuBijJFuDhGYvliuYy2Cnf0WLRXmmEZZzVqSVf/f0tqzxJFjwgrfc+NAN2fQrkbjSzBsBG2RRo7ivWVh0goFhxYMiSip+KoMRAbhi5QBpvij6mV4ySm/n+e2SN9hVA6JFjpzXmv75qq1ODd+tRKD4g1KFY+XyOZu+YXd1L38YgYROeX09C5Vn2X4J1NCtMJtqT5LyvTn55UfOOhhxUEN+z8CLfaDgUX17do42K7PG63ziTnrQB+uh4zhvcAkWF5gNatfP+Wj65pI3U46Wj+mRZyLvwZ0tXEzplkGgirClQMEeijTzfjZKWe1b1Ra295+XoFZSY/TEpocuLrqCYIDuqLktzL/aWZeEFuFQjQl4+g7L5yPC9Ns8SKSaH7VG/pC+BEFSrM/kWoMNUi1CLlMJJsSrNr6fKdE2xZ4zXQKjpB2D1Nd01eq7XwlJj2ydtsWyaDwyXruJYyqVGvdsBUd8DcH97ZRgRQdsdB1K/PlMEuJhA5RtQ9dA4NESRVPSBForMwEA0e4L4uHSsJBneGQ3ev5S3DYi4SrQAA5QPzxeOAoioxEP8+48yW8AaFEBZtrtpY0WbjkcjEZN83/iYa0B4YSQmdMGeHxCp7lzCXpXAxkFKKFYCWh1ZnSslCmfae1EeoW12cm3PSWpKVZh5qhYpyfDN5PXaQgs/8KfugdtvSipAa24o+epIiMbqyqeNwp9eZNJfgHxQ5m0jBaMIERcIFL46lZp+lrO4+5IXI4VU/V0+8k/QCTqFdhH/bQqU45BCij41UC1UTWzlV9lXJC5EQOnTX5msLnu8jFojS5Al36V9h0n9Lzal88BTHVBL2hVo3FBXyqe7DSP4ZU5X1v192fXc0+OT44dM7AH0yOUUZvpWDeBKA/Oyy1poZ+ypRIMC4W7Q1yMn0Mp1wAXdi50daZACq9mEPtdLLuKc8Z+X6jfxyKNQoTQkMhS4boUg03XFA8d8qGZnNjTQrg92nHbVqG4Lh7796lh7EAGvLlcFs0GbjqBkcTklqh/yfY0BAXsq1n9izf0Fv/gQvJCID+qTQKFfPfDC/r32n+03SPesRV38DnZIg+ud8IuDFGKsrjH40yHZl2tu5Wp5S54EwTqrZ9EbkyyTrg7Xla3GUf0nwNpWFH6cjiDY//kfX0AuGa47LnqcFCOhxKjXUAzCQL9gSSvU4LIA4+P1E3KDypTS5ASI0l/vKzaOs+UrWF0AwKFlaTl6d5arWAHLQkqupZyCXvx5a38vHIYRF0BlqAFJoP31ZAYxMp+GWyAQwtH7gHJ05zqvHDKHi4cSwNU9HUEaCP/EpOOF58L3P01955/RqxiHws6P+gItONygrypLelAw8mn+R4Y3jN6YK4l6Osc5bYEngYs+x9IzRuyseRwyvu3I42MrqRRHnS1tmH2kgGhqDWgNNWGRvEBWMFnJlTBD/RYGQ0/VkbxOXYvhU/suzkLoPiE6zlbMUga8FCxoag2NO9x5SEX9gxIFyiTq8u+bh9YvuilBYbxJ1H+BZ6tS7STcJGFbk1aT8NNiKp/mm7R5dHmyFjD5pz132YDtxC2wVIGVbdnjZQNioax35l8Pl7mnL3bXjYaOXiKnMlewYtmKC0uAqsyfJnOm9UyTQipb4kdpgBGVjWW6k5Km18cqxVxWbb+2O6tbbw6tRuxESNgAuGruDsZF0WwM7UpcK4C02MIfYxIF5nb56Y8YauRuwZzCPD/HHgfIYf10o+Zq08la9W/2Zs8h7hLck5CGTQgjRKvrFtO3A7h3yrTm7U24N0ceqwePgJ5kFa+gNL1XrF5f02R+oT4w9NbHypUdtwEKvn2+4or/+SAaD83fkTAnBoc3FIVQptKSeQZ6XCUCYusbPFvbHDnrB0CO1EWR00RRDuM3RIN01q7L9X6k3J6AVtak9TAN54UWDPFnrTa1urIUxA9ld+9y6yoFTfQjlOIDbJFgaPv1TiigiTVo7LCURYn7wKTUI02JRDeIg7PeoSRHc5RV8BWKONJK171NHEtNoPOajBH2kZKDrbRNEmEx65KxD0sZqvOZZfkP41y7jWo/frtnyKAjKons6LB7EgehjfvL7Ceclpf0oaEdJHRQNXCKlj9Dps7rLgbajW70sCv/BwJI1do1UTOykUdySzIurfUCQXn/37FX+VvJClteSvvuxDi9TtQ1AEhsWjR+mRpGowmFnvatCRoBl8Bjoch4hbltnWDjb3mtG2Y9+Dkw65vKLzPYURSSfyVk2ZrBb1KTdyNZ1fWy27nD6JsMEKdvb3HOsf5Winqi+sNRXuoGT51zh4/xa97eEUfYpEeYZ39sVfM+IdU+Rz8vDhQpVvj8vA6L1pHizPhvnW5R8IFj+GMnMPDFAIq6658dZGkrZlTyMX2YDtULYZcIOunuTfWULjq1EdpdZfd+9VMb9eoz4zg6UpAU+T4Hjbg7kFyIL6G+6J5gtHwk0eeEVRU//9JIiuTgcMtERvtH6Ng6zHu0kd9+Hb2gWTlTS8391TxXTG69N1KaRtk+bgbTGxq7/chRoFGmsAtXWqsHlOPDHnMjMcZlK+CECuYX3oOMGdhHssZNefJrWSlTlI6+6Wvj9vwG9oYBmJvn3aCT/VpnTkLYQmnCZ/HnNpL1lSG4wzCvYMeRMS0i20OGydF229OsH3nAC6lz5UPOtSGeNV13YXhRWAYGe/Jfxt0CYquv1HGYYfMenNsluM0sAi+vVsi9kgG+b9z7voybj3tFsl5CkQD+SJEWDNB5BMwkj/9bGdl+HXudXey+prHOvhY+I7qMmBUtb+FO93M7iKW1I1/yGM0qFJrlllPpEU0FqpStE/whQAunuKXLNyI/TV+VWyd4DNmlAQ8WP+OBzZCcMGUpQ2gHITAC8XMw2QVrA4jdPWCEIYQXSTWy7zjUvOiqd3825OAhgbV5+96pgIXbirrmr3i1FPA0uCbFWY26TXXkCaGqr8cg8meI74+c3ff5dnjexC2kWga2213K4ztwnM0Kb59FjyOJaHHhcUd09h5QXuh2p3vxqqgdjgSGzo48X5XPqd9+ZIDfsVZ8JTPGXbcKlPElBs6RV/U+rpnw2mC7Xl6VPduFoL5rA6cdvWqZwX7wkQbNG36aO8firvvqBELz9VDSA5OK4ZyS6niA5+JOcyBaFpvo+E0A8aYihqOWXEdSLn3Pg3J3efv7picD2Uztsyfmqxok4ztbPQ7vJV/DTyvcgo17D95B8zTAzx1lP3zW4jqQ5QBT3QAeYfRQx/VEP2SXOkH0lI6LgSWuKNpeN/o/U/O5gDTkzu8KUBPpZqqG+QcGyGxZ/MgsmDxkzToZtJhXI9avauZGDYxrjznqwUwM73OovjpXL4SL/r6bB6kU9FGOCHqT9Z34euHiHsbZMXv5W/DmqCmiaMseLmwNBpE/EAKKFF0i+LMVe9h1WoM9pbP7pR1zZO6xz31iXSZq1QvBu2u9rWjLML9askEz1KklPcOh8zT535/mctzFruVlDmY1rdBQky260f4GsXCccJIIpghrOwldljWn6AtnB7s+r4SEquF7moe8l5xEQcr0zy8i/FfOnH4ivMqv195KjgIwREsS7bZakB1yGGFN+8MBa6tHb68sf9cDBXzcwAJv8J2a3fxa1v1vOgbRb4k7DQgAqRjxkOTHO3VmGloE6sbFkq4WNTOzrB7AJiW6Fr/LEFZ+5li/kC7nGp79P0gAGwSTHjJXRva67gtfL01BorSU7RGPHMstdiuoWKIPV6tBAU/tiZKKNgHUL/gqZq6ijsf1kf3ja9wm3Tp4FgG94HqfTYdUm3XLPkMhBsJ+90QQE6PCm0SJVJw+JhC3SqVifSJs8PUn9DIutwYGNBjc3Y4HpWW7HAy4LYlDjI0MjcuyAK3C+jFgmIf5mV8Qkdtz98NIvWQpwDz6EvA+wy8XyhWMjgY1fCFbxWE2IW7fhd7jmlS3qdIZYUkT+IEd9jLQGqty+fjyFQYw+O1/66ExTTpZmRkQXcy5iQ/lH8ZyLfOM5rt7UvRchofGkdqHbNTZOHx5ng3DPoBsiPFl2rxtBxhrBI8p+Fj2zNv9tWReOzcYgwr+6L1xwD/+jR8/eKnZfypa07Ta+fne5JLeF9bJ+ToQT1KjoaA6f/0rhHqri3Jgi7ox4Fog3XZTSXt+X3PZi9okHzdqxCdaYf0ZWWxeGzMgKy2ebBO/WAciFVf+Pxnt88ukiTo0TxhzTh+OzubO5HqXtPVvmg4iEsDN8wHoGG9GIgcQbMFeOLtlqm3d6q3R5+5/g2EiBFP76JPgLfmyjd3pywG0cyM3BVgav++8EDpjB3BZHhLGH3iIUyZ87gFul/kyGqN843rw0V1b9CIu3/zldGuJoOQpiZ1fSYrzwAf0yZj0U+mfFkjym+heOwd2yiAFjSi6BT+McsgmgFJC2ru1c51Z+Rwb1qzf8DStvet/j3B2aZ1nKgFgQuZcOGhOIxLaK7NLZwYvUH7BTJCxKDpP9LvMSjXkfxtbhgSsFXFiWjEadC+a/HIRbwGNMzrqrWrcAxXp49WVEuqC47hPOlsBEX6XYZ5j4x2A6ZgSBgdHyjnu+M5Ejh3kBgFLEeOEpJPs+B+WI9X6fBhk6UGIO0Ig5jmwtZK3LfvLRXnZ7YW6QNU0QB63wh5v1zmL5NDVxwYd+zpJwLDRIE1mL+CmM4xXFRxiTBHMUn9u8HjP6BpOAYmpPrO0ddhp2tIs5dX3s2sR37Vn6wd3Hpc3KdKYKeu7tclEKVCweLZ7zeORpgBD9w9j1nMLoYFnUZ8wPWzp98dug1BziujwOE3v8oPJ5E9fcAvXo2/waverJ/diJVa0Zs3I7YNj0uLLmkN0UnkNPq/Vct+B2fBZ7fAZpcNMpwuOBA2tdp4TANZgIkdxaNRv7/pnmNd6SPQmTfnc4iyAr7jy/vLodG20KPZCJuAGXCH+2k+IZNpDF4A5Njqf8yH69FAvkO5HJaQadjFTBFacfO7vfG+kxjMshGsiRnNBiMJEqK8m0Fc27PKZ5xWWCUALwfngzXp2p7+d0jzSTGhG/uJ5iff8Oy4QPcTtfUpiVAe/ukED4GnYutLSOTQROv6+au49BfUwXdg4ufwaPoGbanalCGZgs9om2A/89D2Awn8QTTFWRYXPUsPvsXgPzvRdRzogLCoP0xHVIDdjk6R81AC6iIxG1V5m7AvfnnKhhTdBCoIzz473EuyhqrXq8VOAdp/LM3VcxpyLxayYz2fJFKJxxqbOiQz14JPeR+IGPwqfd3m+YYi4Y4SxLJ3yh+bOz+rGvHnOsDMedgDeDbwz9AAM8lIfiQ0f/bcByCK5a3ui01SMsNdHBvDFq6W0pKQKhMs4pcRQnBOeclXCIYe3biWzZ+/rTB70/EpKiqqivLVByKmeBKAvbJytjok4UbHUDIw4fbEIL2V2W7YI9U0oR4622DV34IGWkWtDhw7NCc1OQZNBczJLnVCUtHDEwp1iMnhXh1mClOCKHNvTumCrs200b5YoMEJ1V4EXh9ilstHsXQ4UfhaiQ38YvwdN2Z6PWyl8N6uoE/jpUhAUc3004Y3u/r+lhc75ebbp2eZRW90FThcO2dbpUj9hYYFSxVS4hCvtUmGiFtn/VpIGIspcVW20/NpVBSgdnY4cNKTWfp1m9BYxwjBtM7ZNWhzoBFArph9mQIg9ZC4fDuF1iSJUkVraC0/AZxpeXxEt6Oxlzc0qD8zbUFHtRnomVS1yLmjxPM+JzZx539cYCLR2WoUJ3hTejTtInfOR2sWjQ97TFoj2+tZ97zflQZ6v9ah/RA1wFscBFyYU8Uhvm3HuayYYuIpTvGo7mYD0o3ldoxHhzNR6RBvUNOnodFgubwUESEwN5t9YvewuWKOntObdDwYu44/mNABnijPvDY8FIu4uMyBoh02Y7yimSYVeqQ0P9OpQpZAvEbjhCfHpQmzLch+OzruE70IM2z7gg5p90PKmqjaGCX+tNSW+vBM5hRpRtvU5HYO/ryz2uaf3srjlZ5UAbE05RGlpMhlKY1REdyXRlz6Ddbifp5ZgZnpJN7z2HlVtUTqT67iiUJlba8XN1rVRbBIx90N44AoSX8Z2ouHdeuvY0ZKSUcmFoRgucrEXd/OsKiha5Ajx14tlnVIs5Uqg6sYLI5O7xhakqy5lt+QmrHKmbT0gu3oZmEeTJSBbLYaWdKfeV3MH6DDbtV++Z2pP18jcCXZ7JzFuOGS2xGBbDFccysSTWCgSDjjEfGqsXA5Ajd6NiaHLv0gDacKADltyaY/F0eWakQrEgaXaBbXgqazPGLVLvw0qU/octnnq5C8HWWiLXa3G3wOG6Dx+SW+ikllc50B8ptlmBwsA/fNiSxjO8N/i+3pDJuviQatO77gdAJ93BKmrJPF60f4RbXXtp/ofz6x1ZZ2EqeFw8MRr6+6vWelHEZIq249sijBU21oyyX9vpdwvJhKaMM1ycCWrzAzdaK2oaO7fjiJpviIpMBpkCT+vs+FDmAaJ8C9pAihYL4jGvgeZjQ2FgKTFI+yxWfOVH0d/ZZa/OG1NvoYGgbbo1aGoVogZn299trL5qgPQnmYKmKf+VR4m4g19Rg4yYkovw3ZedA3oleEWL1a3fk/34srWen+9UptKeIfP62B1IyQoAG0wV4NGs5qOVqE4/78a/KauR5qH+eEvGhAO889pDJQujh+AbG/NXBOpfSLolsKkG4mVpbfjmBlnCwEE0IrQZUtAAr1QOoNrRDBHRFq+Lcp5k0CJRmvJbma9Uq/MjufX3Yb1c/Y7aeIJ4unTSZMxSNMKsr6uj1452LqR1w693quRr/yUGEJgAFB8+t1jNwmCW2O+6gvN5api2hESyG7V9yReFhhpw5izdK9GPi4mhkNG6L5USjh3wzZh5f+dFvMk/4IdHcXADGJqoVRTtVzB5hxQ2DwDwYGPI8JVAEhxv3602rDbtL/ta0bZ5QATZJtLblWG4RDf7meciQco1CkE5tzBIo/8Z2eCsbOzOVWXF/n+sfly9Lz0QKcdtT3AwH2/SQfc6n6swU6vGEJTyNQNk8okNzh0LUfeEUwIyeDuHj6cDF4OT5vWTK6I8DB8GZKUhWe6HCHUDh2kmdxLSr8ZLTykSfL24HN+xG1AlPfTiwZB1xQTa67dvHUBV8MbN32gB/6E0oVpl1jS1r2d1kQdzMtb6Q9adeGaIl9z/Q5vJxWVsS/4AOS0+790zop+TnY5LdfnfLqR0GWhO2RTDjuupX+ZjxOBklNv7P29UF6XLuaX8BXltVqTpvc0HB1xZMhFvKjhBCnsJe7tcsZ0a3xY6sMm/C0wIH0jEZgSjwo5js7hukySjTRoJw0OuhXtXWCquff2fD/MeW9q2KfWLkU9kzug++r9QT0vYTeVypJ8pnAQilEAJLRtZQcvfDfjeoM9tJiq4mPQV1+HfoYjj87EWQWrvfvDTNTH0PLvPEJ355L+yMbsQ7WkRP7G1kposM4iAT3Sn4rhinsjfyhIF1PAaESlb5KNjAR57EbHLQoA2hLU3p2hi//nEQnAGi5sJuTr47HNscWMadDSMYegePvQPNxDsvL16aVG2Wc9dn8YVDfJe8kbgFBlxULnfQGGfFpIFH/knBlidIK2WpUYAW937mbGyEDw9X6I8vL25ba+d1GotVp6DlHMkWH/RkGgXuTuuYFGptPAiXFGQXk5Kb2ngn47JfbjujK3gOIDrPMUpego0Vk7JbhGRFLYCc5u2Bdw7j7KfmI0nHUrL9ICWIwDhmq1vtLJFnRdYSZnTaThzht0sP3y2Ce7xJmVujTid5RADMWLEJYM52PgjY6vseQXEVs0CGN+tK82fqFRhjKcU0e87BwCVd4TtI1H8L+A4PM+Jy/U0RHOE1yRcIogi4HdbtbXLOmLSZ42QdnCZyUEUCBaxJ159imvlwMLcjOIihqrkWfh1RtAY2ZffKpgcjyH3OggyY7R9zELNqWl3Eb7uv8bRqphZ2R4PxP1TP0hVd6s44AAMHY4jkVYC1AuGML92Km9Ps//SnzxHmGgRtF5LzfwxtbOyIILmCxu2I+cOmIfb0NTiNYu3p5lgzawqiR9hD8mwcR8E+kPi0b/nJiUQhOEYbVNrg9tqK57sVSjC8eqj5pwh54AJk5lsBLdxhHGQYJmdBl7b/vl4WqQxLCIlxoFm7RaiMu+bYZ1U7pCHw3yS/qQ+pkduP2QGydeewbyDwOrAfHsgz/DZ0Q44DXVXvP1EkvmJy9oJuSMi4sZwla0FgBxpnSCj1OskEP4yYVP+MrKzidIJXwxgX73WI9vUeWWefYu75LFDyn1fKXRJ9macgIGZQL2mYESTeKv0g/spm+OcnKf1g+mlrPuZ5Mx4uc+f/Djq7v3PgfNpAFfCoFHR5F2OXuZLq498a+sdCVJjD5MYls+oLaIkHchvyNJCUvOl6yWAZV5oHsHLAJVq4UnfOfBznOIaKJhn1946HGX8XTrU2GZ1nmWZFC2jEmcbXWbNTH0XZBBnPcA5C20vhVzFDZvZuW8owNsNEkY/u0xbp8vqCJbjoRKr+86RM2eo6TgH22kZ6Hajwp0dVulFNjat2fmznPq9hCkbMsU7+54pdLL5X2FEyCW/LOd6V3hSEAygI45HDF2GGS5W7jPSX//u0G7hWr1QzPNSWoqmc3ILetBoUVdyOCpL90yc6pTxbKCrlCLrOHVLKKV86rdN2uhZWXFxm13Wqha+lCZo2Nt5vkZXyDrF/nOwXtS9l7Ln2Un6Ckx3NKRZxaGfiz7WIElWdKHqEUfEdUwKYaIfYiWHB/km5yKz6YypU6aapPYG9zKa1fCtejxFtyOsvfSLHVxLXFIiJdtqmuoApk86z3QcDASF/zlXhj8UDLQYy3V3E+gG938UePKofAGCMMFrUrte6iRyL6AQx31GC7cwa7OYCLY6O6/FELfwshr79L69YAJWtfpWgUAPVB2wYfDCy7/m+2VtWchp//LQgegxX3km2kBrSgAV6oK/g+cWQ9RKHtJDY793SixC/mf0Q9kBdJv5jvdR1WslVyIWpgiTbQSxgGta9dyU1jUCP7XsmMbE5dx6H4etjWLxnLomRbaQh1+fMz+ps+ygcjW0bQJaDGRhs7zzYuZnE2w79ImXR8FtLhjOLV1F+vgY9v2Ppzr3r9lpXq8ilgD93d12twt5nRZsyqeSh6HVCgywNJzFEY3Kfpd3frNJnn1r8IDp3blaGQReJ1c28XWFostzV5mll91evFNIdDl+THGgYEi7X9vcIf6QDG0CmOaV9xujbrI+7+fyFF7rMeEwP/gsADmZ0I7Nz9hcEO+Qq26Cysh4XQPOuDTPvXePH5HhbS+rI5uT4j0zIrVrgEYiiM28qV/wUhm4bHqilsuIskY4VN9IbdjNVyYUJptPpl4vkli5ccH85M+wctmEPkqUiyMKu6TA4xxGDI249yxbZ8rrtS0cvcFU6lPmEBbFAMRqPyNfFvhS6WuFPAsBOx25Mfle0B5fVGRYIL//zv6KrHdBEANpFG6vIOYHlwOoY2ogdcflR4hGho08iyNlLu0HRYoCYXFNZZah49SsdG/vEA81v0B3ZqRnX3YCDSpXybx5RT+HVsMig8C3GwP9VpeFSoATZ7ZfgtLBNq1/drTMgQQw1REIhReBImLYB3l5MVh1x2ntZZZFIEawokzWjmLewEja5UupDAjVLyQF3678SN8DQveVYFwqBxNfjjb27rCvb27JrABN+tw8g4iDhYpmG8xUoUVwErIsUmZcnUHREykIKduG3FFrrU0Y/nH81QL8MF87Iidmc/z/Bs6UhnIa697XY+9dLa53G2u8Ha2x1FaudtCYpsVdLtmiLy2S6h6bZlsbaMHfvCV+fawfwmbTt4ZxUorlTTKx9Vm2f9NFhKvGPdGR9eqUPiAO1sV9ZafmV0WnBrjSl2A8y/4VX1pu0ISovuhcjQ8/wCOKS6oQLwnZaYK40fLK8wtSk9T6Hv2F/DeEmFa4AafKU+1UeFyFth+97tYpYjL1SPYH3fBn2CD1kS/IYLZb2kQ064CUJ/B4eTPBmijNWs/iD4wXoT0CHo9llWIn7/ilJiIKs9sZYIhf5AYM/I5iGk6diTCto5O3EhRCoZ7KoG/4D9PSepxE4ASpJH+MDvn0PyQGe0bfCQ+TYevYdm5j1n9G0d3efPktHkgxVSHkNpqCdV4bMzxXOi2IdOuKOYBGbHyjgv1xc5fRiuPiXf4Pxe+P395354IrkFzpQgXWA/O3SUbYXJ0natSgkAZqpF8piGGPoGS73GVsIhDfl5/2Qx9vvozp70uZ0g13ncIMqZPBk9Sno03GdXipExGz74PGxkRYbwHWI11jxBnvqkKghw8UNiQx7PQkeFH3u6+3JBoT2/HNi3eV2xPvYeRPaB1zrWTftNPimXLqWS/pBl8GJfluf6dJ0RGWt03suD/g4FmA1UJp1YoolTob9ylQrVIcN9TZF8wbyDHHSnCtqGvB6q9dSuON9zkApesMUOB/Gzi9dHRmk3kxfqSowhhHRkXCLCJzC9NCf62UuqkpHxtp6YJE6ZyLmDCGH1cDoXEGfcrK6cPD/ZE1sXlv3Z14n+RwItKQQxqFchIZDKDR+6QTuZXon8BJ7nkPvnyRl3OW8GAL48ruyw4uCVtDn0/o7gv1bYPtWWhIKAISTXXXutMsuvibn6VSibNasFsnfNN96oGWw4wRdu7Ii0aKvUv5OurmcSdeCnQiVQ9CqAvqIKdIvsRAJAdwOuhY3FuMvEpdBdZfUM5OU3MtV1W3YTjqSwZOfcb2o6HnVJQjriS4qFOmhIYUBip0RKCyA66B9CejPdDdDj1/9/hT4wbBAa/JKpwZcVm/lJjIJqfnbixmXHAC7aOomtIS85bLpzbzeAwUI2PDnunxoGGiIN0FZ5zzUjaMnZBqB3/idAp/de8q+BOu9xZ5EZsh2+y8hwGhXf1CW2KMAZb6KZmE0XBZesMmx4xs1htKYax8tJFLb04krqxfbgQpa3qlAvn3BfP9OJ+pWMiHLMjgqFU/QPwnQYBQGFDxpz06UstM0Jii6FCCibz+oG7HCuCKmxfN9Kz7HgJvkjXJnfDx6vg/KhIa6qwFFHHHy4WsyvoHC5Ij8UxduUxCepe/wJyqj6N7Yzg2nXQUcowVLVaj8FykKndllyuaMro8TgJ9TzTJPgWU2OzQOblh4wsu0zLY93jBLTu/7NsgBBVl0+A+UxvR7wzUnDn8WP2qwASbid52f0bRdRWsh9WnedyRcVPinlIz+3EkuL2k4Ri/HWlP5zdNG8PvYQ9QdJFukYv38JzkqXx2X0BaUJpxvqsjOPJrCIIl70/cFKIGCPM813Fq5Is8U9SOfdtrp/0ApMvHo9o536cJw78UBqFRgoza6fsMsMRcZxIrqATJdguZ6frD/9ZaoifWMIg/tcVIkV7H3b9KUJRAU/GRqrZh2ghVcBG/7x1Iry+y3zZXY1QyoVr71W8mhP7MI83g4NglvPt87CDs0AZurFlxeWyPEAbs19ZAnEkaAKTcwmy2/FaxoFcYxjfhVSLvMPjUoTN/PWvBzME98fY/a8e91+oeIWS3GDk2gVTHyksEdiHzb2QRkGkmjHURfdr2p1PFhMfDfJi5ruIC3ujqUmVN4Q8ROsmZhXxgQZMY2qbw4J9lOHC/pCvKUnKoTfwM/s1KUdHomfYNnkyvicZUPsHZDOZGX5UZSPyuMzdOUYQyBfh5IEbnRaxt65LBGnTKwMfFUl6ZEf8KH8xLm2Ij6op/tNFkoNCS5a/KUwSpWcHAqIKA2fJK7oCGCVCS5nMFr2TvuK9I07H0ZPt57IR9B+uOINuMnA8aRfzfzMd8+3BT1HSs6DDpAG+1sQs9AtfJpZeRtE3xeciTrX2VUwUWIA+FbYmEzhBQsej2SrW7fKZTUPR3QvvyWDH8DmOcZF261Rd8oRClRp1JqMtRDYz+jTxb2PNjRK1dIkPU6ONvQdIA0RjudICimA7Gb+/LNUP5XCYVnP8dfabiw8ajtDT3lF79SmMzdaEge4LQScJ7wx9QpcDaxTy7oRxo20lmQM0/pm28s76s63cDb+xsXGXwLP5N+OljD16/XhuEG7GScpdXEiNsCA5RE3Aew+QyIjoeBOfF6d86POEpu0fc/n4w+4X8umORlsdXeIKJ9Chv+vDq1/bq+ys59uXaManZvgPQ+ji30hQxZv4HBQ5fouSU/txtH5tlVBIyacH5XMQeq5JrR6VdCfJh+S3J7ysUumZl16ZyMXA7cBF8KGuW1rp9nffTSLGXzTgGm/j5R0/VCXxepfjbuXkfhLfCT+RrPzJZmWyjutWKb0y8Ncwzx4Y20tRYM9ToadP7Yrm8ZX5V7DkrL96K8GYc4Zirsyfi/ThxsMasplXSuAYb6IbaHAK3/hPdW00FMP+3fznEFVRivg+hLMLeqdc3OIhMDWrne6gcflIGGtcJ1LBh2my16Jlnr0X17Kxfr8A+zmxVAoLCKUwhySclcv8OjxId+0QP1f52+7Y7ElmH6tJY3Bif4R9yByhA4MjHsAAgeycqD/jCCDPfmWwoCgKfKcwoTvJUM7Z0EfLpHRIgjtuL9Ux7dYn7Y5vLVeM050Hgo1dmRDPgJMZFefktySvWee3KLL7LTC2e+6Jbc11JEXrlamu7hDicPHgijt8l1RWzyhNn63kUYF2jWmkpWw+K5LgEX1sUqpLmG3NFcxH/n2basA4LvydtRxbBC/4ljeh5nNAK04aDvAMfMokAHEpyrGbDVuTDDGsivoud5RJ+A6YREQPPr6TiQMaL/4Z4lv9t05Gl2Yq+SRt2OeL+4aYD9CowFGcPOodNX+qoTethOhSR3OIvtplLc3Ji8OV78ND6zrXB4yMLRmd2iIfLFfvYUK2ICu2Qbq6ty5/m+k1Ituikirnwe6M8etWdeHyQ3MHD7M+wpmM3iXBSQTrcTMb/1J9BOGbaW3DkJs8vN57hUeJ/RLSYaK8GDfrDarpLzXLsW/owyT1W348//P1cvszfYY370TCsJP7SS7Jc1UFgPfwG2irqkOGHG4AHWEX0oZKl7MrGzOZaLLxlAR6ynfdrr2u1uFpG2/DdxFY/olTkoxaa1GzlPFVCVw/F5YRrCuZvHvTLQjmB6set1wDQP856KZSsBMzQFxMKVw1Ov0+7U5+GtjwdtTwA/SCs76dpm3N9OfwyvBZuDAUivqtHNi7kFhL5RsWHnOD7jHVJekTM1wh0l8jsEE+7WX8UGSXY6hxLoV/cyyCW1nNxw7yBJ3psvYV+Q6gebBALww4EYsju/VWJTj4I/PrkdKMWYh/HZngmlcUsyG3lc1QlO4DZBl3FUGF9aEsgVneMcIbuEAYisHP1RNgS4kv73EqamV6DQ4nGhve7oLFUj5PKZfvHXjEGf7FBplwddQVPvsizuKM+RhFTMuNa/BoWfolPYOj1U4qwtfc0ZPBzFqDJ0qugD5wp6GTI7xDV5HokED1WHTmse7mtVegS0RkeeOowhgp01T/KdL++mwerfPl2HSG/hMflJxq8K2VYtyBoELXcUQWjiH8FMKMYsDkveYgP2cUMqXzmqO0FWblOzCZlLsUnOj4Y4aeNCHha+s3qOGh4x6T3yIY+T/qp9K/1rvX7xoldeGowEjX9HtJsqzV0L5IouSg/C9RkCMRM4hUOXHxO/Ia4bA4mL9CwVPHahgsbZWsT6hZQv+Xs0PT8KJLTOPB/OS6iHM3/fmtHadrR9fDiZvzAtoMRCXgn2fpizY6cPuPmKsI36OP8qOxrFoqFGUjZNbF4lZhdrxVvhvjQnlpiSZzEd6MfkHkQIyEifeOEu176VKdHxIKL77TFViP0wl6ukSKaPkjefQ9+mT1SV9TsF+mbnYBiaMkPR0ii8pL6S5juRJzalng+s2iy+6CCqO5OffFIERsEg9Q3dqzfaN+Lli1DoEWSh7g4KqWsJ67+byJhCBh+ZIBKMG0x9Z5dmSUtYFXXkm1Ohf69LAFlJdZnmHDsWUJZlufP27n8yP+QA5nHJhF/WfWLyMLeA83h4mxMucOFpg6RFIxX53NUmMc7l7aNAAn4VqLoFVSTx8GS9lk2et5n/CeEoSTpUJcKAdf5/8PzZjmUBOPtw98agUBlz6GNPCv9xV/EeS/8H/Id5ddZfpVWID8sm0er6E6gn2nMB/pLrvTi2o517yi7ZDdXHNdTj7/NNqVl7y8YejN58mtr2fJix4mWo7PrP0lZw61G8ruzZyalNilnDCQp4dxIYHqF6a70A6czkqwbJfkwo0DnfWVqQGm2WYaJUkfqnQUk/8Y70vogEj5CL8/1z2ugDuksik5K4SDjpq2W70tzf96ZPTp64ed1ESCJJvFkBSfM4C3YGdtpBa7GL/mn00GlXr8k+3TXMxisga/vKmMmzTxuTgYLECI1xmy3bZij8tnp/hzEbwhzU9tRGYP1mxMqePbm2T6xuCrbUndWkv7uP2KiLjAGHrWBuIxWOAj582zyhkTBYkzE/AuC/b57Z2z4rFpeFGUNeumDDdHZZJ0ytXYm9aef+dz0LIEcuHSypW1fpMiRkyS871f+kr2onOJumKJI0ubCtuBB2+IW4ms/wtwCz9oH9zKkdZv9S/7ycyd00FyJibhP4NaEnDK6tvxfamDUPWxG8Pa/faPgAMN0Gg9d52aObJDMEBmcK5A/sP59WvG0/nCC1QHPFAegK2qfEsZLoIYZggpwo7rwdmUyAgEh1RAjw30ymCn+q4bNdsB9ZyLeER5QBxIqdTQpp5d3e1ccozxWdBtBnVD1r0bCGTjddGR45ukzgTrOQZrwo8XCnNq+S6p/0bHx1u79PzLqxmB2DjqhnEJrIssVPcOSmGNI7DFZC1NBfq4nGRVeTGu6h0/PRa5YUJpuu9/RdPs8eMzvKP1ynfuq/3I/BivYYgVO8c8xrnS1HZKqwL2Qb4eq3th8vuwUZkM0Q8Dx6ngDhqtmOMZCWSa4uUzhEL8vWDKwCS2aPTTpNcM1xfxnlFhABwO4Ceh6cKtygcyhd8Op5W8CJgUO9i8nTQn2e+B3ob6enUKh2mZNwNKD/ZqGz+3yABVNKqYLHrku8nxXfL0SYsi+i2lDKLhQcvL29DpTdANr3RCpiGMOyf+LYSfn0Cp9xPRYn4VL0LLNb00MIZo5nK6kh+ykqDaMfUIuapIiraYoIkc0b8A4/ZVdMUMfCf6cmW6m1DymqCexi80WDfHBreSVG1bRJ7ojdKdbVXAgDvhGNNwV4wmt7qi7MLvo8WPTzBJig0/bZZx6sozszA0IRw6k+oGSoClZ617jYhhrRuONEDjq4S0a7hTl8ZuklwBvEeUUDDEJJD697W+/i+WaJocoK0QfUH7tqeU58VHtsJSzjuwUiy0rfVLufY9Ne6A6KBA+VNXsoAaX4ASntO2gTCdf/ZVaekm2bZWGQl+ro3RhjMBWnIwQn+T/MWWHQtIizZremiGkO2SuUpsLmPG1JVEdXA6OXkzAuuHy/wA0J0HmBMAHDdMBT6eOLBX0aRsnBrUBj98LF1fP2YytlVUe/daG4g5WrN4RNKbzJ6qOxgXbudvT7NDUkyU4JQK7ysuyJwR3TgkBQrm/CKdpYQ5vBBk81ZRn7MeyNLdvUY3igzO61TnAWJ6QMcJkCczU46AkzBRG61u/PIHfsU2Qg5gWvVnpwAtJjyZdu/pXyJ0X4lll1KlX9VjMWm0QQp9WRoNzNCGWAiDNCutK/3DfySZwm8KYSYBUC4dNbDIYGeh5tmNoF3SQtxyz/skXFbfxr9ZBoB+11wzSQymG4ll6Df2nXeEmRrl+pQyoMe6GMYrzSiDO7CIz6JnzJdLXb/RSkjDQha5ijMI1wFOcz26LsRbffaC9VzBPU9lIKNThD7PsiH/HJgrzOHQGZjkmMgnhOJ+2egzHXzxICWHPb+OEIXbt6kClxldSX3CfZS4XBl4kV1LW71ceFHzRl04LpewuKifZQur6OBAdPkzccU5o0rwwd1pMRsamR/A+nTYhCzsOGSu8Qmy9Xx9JCLdTpmNQYT0zTE3OIK7a7RPVYAqfMxFBHOC9on6EhBLQA4cKEGLCBWfZpfnIokT6kmBXAh708u8pL3OxsC7L0OjwsJB2njzaMe3Gpf7PDVlv2CJ4HGaqxv9tZpIzeznyI6CZDXuMwsaVwvabyPekZQNFP5zuaEjZV0ajPbuwsT00bqqFiEPG45dFllCjZG2t2Dh+4eTNxUYueMpBuG3GrqxVZjszK5NcS9+1qxTqQ0H7aHNwq4K+FyeyxRiowQwu0CMk08C3FnDzoMIgtSGXvcwRAtztzgjXZRqpvOJxmJeoBt2cfJprcgK4ruUbnBSsqG3XAkPrN593wqMw6degAfVLQ8jIufS4UOfmChgOfBt9U3Wrg94ssl5kxRTVJvIr6McPoInsAQ7Y7lbsWtijH8xlLVrEPYLeTntUyuyssBqrDW+LE8CUcP+sa9a+6ZC9/L5Gyw7d8+CZcw4qUk/gLCgR3zLtmEXdT2ZIkcvEVz+tqjLnU8V+VSEo2d1dK2hdSmm23WUCaskzk4vO9sVEMpDK/Js/Hs6OfP6+VF2tB7QC8lZUhb0f9Coc+nt9c+XJDX1033MORDgI6nmutDv7ckH5A3TqZN6HszKla23PIpfRmjsagS/uiCYo0Q7A9eMovaCwN5bfIO8nvBOcN5dqPhjl4yvUamNAwFyIMZni7o9mF/wm5qL4m8TIKe22XUUkm5gKX86l+49JMN0bXRba91B8II6DdfGl2phmST4kskh/J6oLm+ZlNwQra59V4nD+e5Y2fpQFUtFsQMtE+++bqDPPCv3Fi+pSSEQcGd/SUU3Fu7T3/JrNHmaFko31zAVzUQzr70KlkUAgIK6PlVFXCP4v537vD51wBcxhDDef93Nbs6mq4LNRoK1gK6FZXr69vpRf3C/PJiDFNAR8sUq81KP7uA9zbOp4dNKmFxd3I9bzXln81iqwtNFj+PhcxmstzU+iFw+vXrB4+ZcCCKia7Ns/Oky3wT3g507oIqWU6YKReNyPOl1AkF+0Fj+cWuWXUdS6iZeWlZuHZ5UHSmJ0r75Y2Ps1liwpeRuc9ZMi5MmAWart1fwMUWt1fNR7LZBfagwe+rLZuGu0gxm8dS7LhKlGz9Z4Znw0D8IBi6bELDo2M6HK0r5Uk5oiRo2DpDost/iZI9nEFsF7iyB0/nZnb9LfiNpcG4p2qDd1vNCn2eV75eWjaFO5X6Z5OXhYqWT3FxkrkAVVC72aUjQqyTI9KEDxaiu2ZkBfuZz/AX/8cTKv151lzWjcdUAkePh61P66VLbj9du6Jz1u4+HfDbrC31ihV854MAw/aNMGPE1kZ22lPpS5kfAGQUp8eiuHX7XAOg30Wm9viNwb/kkXxOn764Ng6iZRNuV+BCh23lHZzjxjZhOhs15anYFNm5CoekIEKWB0JtOZGZn+c0/tUttQ2Ra3btvjJXTxGflzIj+TAbucO5omzj8oeQNG2UvLqHwrlr4YkHVu5HaFIBoO+TJH8A1IOPNtKpriSIect1OdbMnYRW/mFOsPmDEJwBNdY++NdEiy+lEPOxb/NyMaOkFyC3FaygBhQZSlkD0hwjeFuRKXVcJAhh7PjHr2hNlej13RNc0TUq5oQWTn4qoPDZvCnHPtXAzlLMfHYhj/XuwKGpyLxKTcCnH13DGCZta1K8Muw7aUnzcfbJ/0h6R5AvSdPNLIOJyKTSoBFGJflEDDCKasw2CKlwEt6nhfBrFTmih0hNYjc1EL8EUf/XZ8fJL2uqRl1Vs63MgynFrqhqKLSTCDMXbUBF7ASOjUDcQNyspPoM1uCtiQsjiE0T7A52Fbv/leGVGMkPi4ZLt76qeaWoLPxQLmq4KYZuxXdK0kPV22EU3RFMdB73SLOhz8nMR/NrVCq62xOQFcuqFmfAFY7AUS+/SCJouB1JNMX34/XYUICY5Jl2pOZxzmeqwuoH7pEbekcn4j+cAOap0wYcYMfXk0PduWo+RaUeAB7Hn4AEv4AAAA"}));

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
