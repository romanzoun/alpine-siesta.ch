// Macht aus [Text](/pfad) und [Text](https://…) einen Link, nachdem der Rest escaped ist.
export function textMitLinks(text: string, intern: (href: string) => string = (href) => href) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return escaped.replace(/\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g, (_m, label: string, href: string) => {
    const ziel = href.startsWith('https://alpine-siesta.ch') ? href.slice('https://alpine-siesta.ch'.length) || '/' : href;
    return `<a href="${ziel.startsWith('/') ? intern(ziel) : ziel}">${label}</a>`;
  });
}
