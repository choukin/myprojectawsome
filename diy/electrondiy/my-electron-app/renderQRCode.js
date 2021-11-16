const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const JPEG = require('jpeg-js');

Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, { maxMemoryUsageInMB: 20480 });
const city = '0371'
// const config = {
//   city: '0371',
//   img: `0371.jpg`, // 底图
//   count: 100, // 打印张数
//   url: 'https://m.qshealth.com/zbb/landpage', // 二维码跳转链接
//   textLeft:1882,
//   textTop:6695,
//   // 二维码
//   qrCodeList: [
//     {
//       healthitem: '1', // 18岁以下 儿童百万
//       width: 1024,
//       height: 1024,
//       x: 3031,
//       y: 2184
//     },
//     {
//       healthitem: '2', // 18-60岁 成人百万
//       width: 1024,
//       height: 1024,
//       x: 3031,
//       y: 3772
//     },
//     {
//       healthitem: '3', // 60-80岁 老年防癌
//       width: 1024,
//       height: 1024,
//       x: 3031,
//       y: 5370
//     }
//   ],
//   tempFilePath: (config) => {
//     return `./${config.city}output-multiQRCode/${config.codename}.jpg`;
//   }
// };

const urls = [];

function resolve(dir) {
  return path.join(__dirname, dir);
}

/**
 * codeBuffer 转图片
 * @returns
 */
const codeJimp = ({ code, width, height }) => {
  return new Promise((resolve, reject) => {
    Jimp.read(code).then((res) => {
      if (res) {
        resolve(res.resize(width, height));
      } else {
        reject('包装buffer失败');
      }
    });
  });
};

// 生成二维码Buffer
const codeBuffer = (url) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, { margin: 1 }, (err, url) => {
      // 注意：这里必须把“data:image/png;base64,”这一段去掉才能转成正确的buffer
      const res = Buffer.from(url.replace(/.+,/, ''), 'base64');
      err ? reject(err) : resolve(res);
    });
  });
};

function renderImg(config) {
  return new Promise(async (resolve, reject) => {
    const img = await Jimp.read(config.img) 
    const font = await   Jimp.loadFont(Jimp.FONT_SANS_128_WHITE) 
    const codename = `health.shop.${config.city+config.shopCode}`
    config.codename = codename
    img.print(font, config.textLeft, config.textTop, codename)
    config.qrCodeList.forEach(async (item) => {
        const url = `${config.url}?mp=${codename}&bi_cf=${codename}&healthitem=${item.healthitem}`;
        urls.push(url);
        const code = await codeBuffer(url)
        const imgbuffer = await  codeJimp({ code, width: item.width, height: item.height }) 
            img.composite(imgbuffer, item.x, item.y).write(config.tempFilePath(config), (error) => {
              if (error) {
                reject(error);
                console.log(error);
              } else {
                resolve();
              }
            });
      });
  });
}

function createFileData() {
  fs.writeFile(resolve(city+'output-multiQRCode.txt'), JSON.stringify(urls, null, '\t'), function (err) {
    if (err) {
      res.status(500).send('Server is error...');
    }
  });
}

async function render(config) {
  const spinner = ora(chalk.green('🚚 图片生成中...'));

  spinner.color = 'green';
  spinner.spinner = {
    // interval: 80, // Optional
    frames: ['-', '+', '-']
  };
  spinner.start();

  console.time('共花费了');

  for (let i = 1; i <= config.count; i++) {
    const shopCode = `${i}`.padStart(4, '0');
    config.shopCode = shopCode

    try {
      await renderImg(config);
      spinner.text = chalk.green(`第${i}张生成完毕`);
    } catch (e) {
      console.error(e, i);
    }

    if (i === config.count) {
      createFileData();
      spinner.succeed(chalk.green(`执行结束`));
      console.timeEnd('共花费了');
    }
  }
}

module.exports = {
  render
}
