let svg: any = '';

for (const key in window) {
  if (key.includes('_iconfont_svg_string_')) {
    svg = window[key];
  }
}

const reg = /<symbol .*?><\/symbol>/g;
const iconfont = svg.match(reg);
const skills = iconfont.map((item: string) => {
  const name = item.match(/<symbol id="icon-(.*?)"/)?.[1];
  const color = item.match(/fill="(.*?)"/)?.[1];

  return {
    name,
    color
  }
});

export default skills;