import React from 'react';

function getRandomCatUrl() {
  const STATUS_CODES = [
    100,101,200,201,202,204,206,207,300,
    301,303,304,305,307,400,401,402,403,
    404,405,406,408,409,410,411,412,413,
    414,405,406,407,408,420,421,422,423,
    423,424,425,426,429,431,444,450,401,
    500,502,503,504,506,507,508,509,511,
    599,];
  const index = parseInt(Math.random() * 10000) % STATUS_CODES.length;
  return `https://http.cat/${STATUS_CODES[index]}`;
}
const CATS = [getRandomCatUrl(),getRandomCatUrl(),getRandomCatUrl(),];
const IMG_HEIGHT = 240;

const Component = props=>(
  <div className="flex">
    <ul>
      <li>This gives you the same result...</li>
      <li><img src={getRandomCatUrl()} role="presentation" height={IMG_HEIGHT} /></li>
      <li><img src={getRandomCatUrl()} role="presentation" height={IMG_HEIGHT} /></li>
      <li><img src={getRandomCatUrl()} role="presentation" height={IMG_HEIGHT} /></li>
    </ul>
    <ul>
      <li>... but this is more convenient</li>
      {CATS.map((url,index)=><li key={index}><img src={url} role="presentation" height={IMG_HEIGHT} /></li>)
        /* when creating elements dynamically,
        you always need to provide each element a unique key*/
      }
    </ul>
  </div>
);

export default Component;
