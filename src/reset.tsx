export function fontFace(name: string, src: string, fontWeight: any = 'normal', fontStyle = 'normal') {
  return `
      @font-face {
          font-family: "${name}";
          src: url(${require(`../public/fonts/${src}.eot`)});
          src: url(${require(`../public/fonts/${src}.eot`)}?#iefix) format('embedded-opentype'),
               url(${require(`../public/fonts/${src}.woff`)}) format("woff"),
               url(${require(`../public/fonts/${src}.ttf`)}) format("truetype");

          font-style: ${fontStyle};
          font-weight: ${fontWeight};
      }
  `;
}

export function resetCSS() {
  return `
        ${fontFace('Open Sans', 'OpenSans-Light', 300, 'normal')}
        ${fontFace('Open Sans', 'OpenSans-Regular', 400, 'normal')}
        ${fontFace('Open Sans', 'OpenSans-Italic', 400, 'italic')}
        ${fontFace('Open Sans', 'OpenSans-Semibold', 600, 'normal')}
        ${fontFace('Open Sans', 'OpenSans-Bold', 700, 'normal')}
        ${fontFace('Open Sans', 'OpenSans-ExtraBold', 800, 'normal')}

        .esp-widget, .elk-widget {
            text-align: left;

            & > {
                div,
                span,
                applet,
                object,
                iframe,
                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p,
                blockquote,
                pre,
                a,
                abbr,
                acronym,
                address,
                big,
                cite,
                code,
                del,
                dfn,
                em,
                img,
                ins,
                kbd,
                q,
                s,
                samp,
                small,
                strike,
                strong,
                sub,
                sup,
                tt,
                var,
                b,
                u,
                i,
                center,
                dl,
                dt,
                dd,
                ol,
                ul,
                li,
                fieldset,
                form,
                label,
                legend,
                table,
                caption,
                tbody,
                tfoot,
                thead,
                tr,
                th,
                td,
                article,
                aside,
                canvas,
                details,
                embed,
                figure,
                figcaption,
                footer,
                header,
                hgroup,
                menu,
                nav,
                output,
                ruby,
                section,
                summary,
                time,
                mark,
                audio,
                video {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: baseline;
                }
                /* HTML5 display-role reset for older browsers */
                article,
                aside,
                details,
                figcaption,
                figure,
                footer,
                header,
                hgroup,
                menu,
                nav,
                section {
                    display: block;
                }
                body {
                    line-height: 1;
                }
                ol,
                ul {
                    list-style: none;
                }
                blockquote,
                q {
                    quotes: none;
                }
                blockquote:before,
                blockquote:after,
                q:before,
                q:after {
                    content: '';
                    content: none;
                }
                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                }
            }
        }
    `;
}
