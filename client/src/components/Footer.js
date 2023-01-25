import React from "react";
import tmdb from "../Assets/tmdb.svg";

const Footer = () => {
  return (
    <div className="footer">
      <h1>有疑問嗎？請聯絡我們。</h1>
      <table>
        <tbody>
          <tr>
            <td>常見問題</td>
            <td>說明中心</td>
            <td>使用條款</td>
            <td>聯絡我們</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>隱私權</td>
            <td>投資人關係</td>
            <td>企業資訊</td>
            <td>法律聲明</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className="copyright">
        <p>Copyright © 2022 Ryan. 保留一切權利。</p>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={tmdb} alt="tmdb" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
