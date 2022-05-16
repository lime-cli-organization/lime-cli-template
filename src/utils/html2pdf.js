/**
 * pdf压缩下载
 * 【】绘制性能问题
 */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const page = {
  width: 595.28,
  height: 841.89,
};
export default {
  install(Vue) {
    Vue.prototype.html2pdf = (selector, title) => {
      const element = document.querySelectorAll(selector);
      const options = {
        scale: 12, // 缩放比例，提高生成图片清晰度
        useCORS: true, // 允许加载跨域的图片
        // allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
        tainttest: true, // 检测每张图片已经加载完成
        logging: false, // 日志开关，发布的时候记得改成 false
      };
      const zip = new JSZip();
      const promiseArr = Array.from(element).map(async (ele, index) => {
        const PDF = new jsPDF('', 'pt', 'a4');
        return await html2canvas(ele, options).then(async (canvas) => {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;
          // html页面生成的canvas在pdf中图片的宽高
          const imgWidth = page.width;
          const imgHeight = (page.width / contentWidth) * contentHeight;
          const pageData = canvas.toDataURL('image/jpeg', 1.0);
          // 一页pdf显示html页面生成的canvas高度;
          const pageHeight = (contentWidth / page.width) * page.height;
          // 未生成pdf的HTML页面高度
          const leftHeight = contentHeight;
          const data = {
            pageData,
            pageHeight,
            leftHeight,
            imgWidth,
            imgHeight,
          };
          // 页面偏移
          let position = 0;
          // 当内容未超过pdf一页显示的范围，无需分页
          if (data.leftHeight < data.pageHeight) {
            // addImage(pageData, 'JPEG' 左 上 宽 高)
            PDF.addImage(data.pageData, 'JPEG', 0, 0, data.imgWidth, data.imgHeight);
          } else {
            // 超过一页， 分页打印
            while (data.leftHeight > 0) {
              PDF.addImage(data.pageData, 'JPEG', 0, position, data.imgWidth, data.imgHeight);
              data.leftHeight -= data.pageHeight;
              position -= page.height;
              if (data.leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          // PDF.save(`${title}.pdf`); // 直接生成pdf文件
          return new Promise((resolve) => {
            let datauri = PDF.output('dataurlstring');
            let base64 = datauri.substring(28);
            zip.file(`${title}${index}.pdf`, base64, { base64: true });
            resolve(PDF);
          });
        });
      });
      Promise.all(promiseArr).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, 'download.zip');
        });
      });
    };
  },
};
