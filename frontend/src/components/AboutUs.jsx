import React, { Component } from 'react';
import '../css/style.scss';

import Header from './Header'
import Footer from './Footer'

class AboutUs extends Component {
  render() {
    return (
  <div>
      <Header />
      <h2>About Us</h2>

      <div class="page">

      <h3>Company Overview</h3>

        <table class="table-data">
          <tr>
            <td>運営会社</td>
            <td>TORIMO LLC</td>
          </tr>
          <tr>
            <td>設立</td>
            <td>2019年11月</td>
          </tr>
          <tr>
            <td>事業概要</td>
            <td>Webサービス企画・制作・管理・運営</td>
          </tr>
          <tr>
          <td>電話番号</td>
          <td>‪1-(425)-310-5359‬</td>
          </tr>
          <tr>
          <td>e-mail</td>
          <td>‪<a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a></td>
          </tr>
        </table>


        <h3>Story Behind Ohchee Studio</h3>

        <p>Ohchee Studio（オウチスタジオ）は日本のクリエイターが海外で活躍出来るように、エージェントサービスおよび専用プラットフォームを提供しています。
        <br/><br/>私たちのゴールは、すべてのクリエイターが「世界中どこからでも、好きなことを仕事にし、適性な対価を得る」ことです。
        <br/><br/>オウチスタジオのサービスは、クリエーターとしても活動しているファウンダーが、業界の慣習や相場が何も分からず、仕事を逃したり、思い通りの報酬を得られなかった経験が出発点になっています。
        <br/><br/>弊社サービスのファウンダーは海外在住ですが、日本では可能だけど海外ではできないこと、またその逆のパターンを数多く目にします。
        <br/><br/>オウチスタジオも、そんな各国間のギャップを取り去るサービスのひとつとして、ユーザーの皆様と一緒に成長していきたいと思っています。</p>


        <h3>Our Team</h3>


        <div class="member">
          <img class="us-picture" src={require('../img/Chiaki.png')}/>
          <p><strong>Chiaki Ikuyama</strong></p>
          <p class="member-title">Cofounder & CEO</p>
          <p>香川県出身。高校時代に渡米。起業前は外資系投資銀行で勤務。ウェブデザイン、デジタルアート、ファッション、旅行が趣味。フリーのイラストレーターとしても活動。
          <br/></p>
        </div>

        <div class="member">
          <img class="us-picture" src={require('../img/Emi.png')}/>
          <p><strong>Emi Ayada</strong></p>
          <p class="member-title">Cofounder & CTO</p>
          <p>Emi completed her MSc degree in Computer Science at the University of Tokyo. She loves bridging machine learning engineering and data science to solve challenging problems. When she is not working, Emi enjoys playing tennis, joins coding competitions, and travels!</p>
        </div>
      </div>
      <Footer />
  </div>
    )
  }
}


export default AboutUs;
