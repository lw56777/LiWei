const skillNumber = '4758532';
const appNumber = '4754901';
const svgIconFont = {
  skill: [],
  app: []
};


for (const key in window) {
  if (key.includes('_iconfont_svg_string_')) {
    const svgStr = window[key];

    if (key.includes(skillNumber)) {
      svgIconFont.skill = matchIconfont(svgStr);
    } else if (key.includes(appNumber)) {
      svgIconFont.app = matchIconfont(svgStr);
    }
  }
}

function matchIconfont (svg: any) {
  const reg = /<symbol .*?><\/symbol>/g;
  const iconfont = svg.match(reg);

  return iconfont?.map((item: string) => {
    const name = item.match(/<symbol id="icon-(.*?)"/)?.[1];
    const color = item.match(/fill="(.*?)"/)?.[1];
  
    return {
      name,
      color
    }
  });
}

export default svgIconFont;