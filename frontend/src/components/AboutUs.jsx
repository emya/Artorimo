import React, { Component } from 'react';
import '../css/style.scss';

import Header from './Header'
import Footer from './Footer'

import { keys } from '../keys.js';

class AboutUs extends Component {
  state = {
    language: 0,
  }

  switchLanguage = (lan) => {
    this.setState({
      language: lan
    })
  }

  render() {
    return (
  <div>
      <Header />
      <div class="wrapper clearfix">

      <div class="page wrapper clearfix">

      <h2>About Us</h2>
      <p style={{textAlign:"right"}}>
        <a onClick={this.switchLanguage.bind(this, 0)}>日本語</a> | <a onClick={this.switchLanguage.bind(this, 1)}>English</a>
      </p>

      {this.state.language === 0 && (
        <div>
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
            <img class="us-picture" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Chiaki.png`} />
            <p><strong>Chiaki Ikuyama</strong></p>
            <p class="member-title">Cofounder & CEO</p>
            <p>香川県出身。高校時代に渡米。起業前は外資系投資銀行で勤務。ウェブデザイン、デジタルアート、ファッション、旅行が趣味。フリーのイラストレーターとしても活動。
            <br/></p>
          </div>

          <div class="member">
            <img class="us-picture" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Emi.png`} />
            <p><strong>Emi Ayada</strong></p>
            <p class="member-title">Cofounder & CTO</p>
            <p>香川県出身。東京大学大学院でコンピュータ科学の修士号を取得後、渡米しソフトウェアエンジニアとして主にスタートアップの会社に勤務。テニス、旅行が趣味。</p>
          </div>
        </div>
      )}


      {this.state.language === 1 && (
        <div>
          <h3>Company Overview</h3>

          <table class="table-data">
            <tr>
              <td>Company</td>
              <td>TORIMO LLC</td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>November 2019</td>
            </tr>
            <tr>
              <td>Company overview</td>
              <td>Design and operation of web services</td>
            </tr>
            <tr>
            <td>Phone Nuumber</td>
            <td>‪1-(425)-310-5359‬</td>
            </tr>
            <tr>
            <td>E-mail</td>
            <td>‪<a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a></td>
            </tr>
          </table>


          <h3>Story Behind Ohchee Studio</h3>

          <p>Ohchee Studio provides an agency service and a digital platform for talented Japanese creators to reach the global market.
          <br/><br/>Ohchee Studio's goal is for all the creators to "make a living from what they love doing, from anywhere in the world".
          <br/><br/>Two co-founders started this service from their experiences as a freelance illustrator. Chiaki had difficulties securing commission works or getting properly compensated as the Japanese market is saturated, and she was unfamiliar with the overseas market.
          <br/><br/>Coming from Japan, our founders recognize many things that can be easily done in Japan but not overseas, and vice versa.
          <br/><br/>Ohchee Studio strives to become a service that can eliminate such gaps between countries, and grow together with talented artists.</p>


          <h3>Our Team</h3>


          <div class="member">
            <img class="us-picture" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Chiaki.png`} />
            <p><strong>Chiaki Ikuyama</strong></p>
            <p class="member-title">Cofounder & CEO</p>
            <p>Chiaki is originally from Japan and studied in Minnesota,USA. Prior to Torimo, she worked as a USCPA at Deloitte, as well as an investment banker at Citigroup. She is also a freelance illustrator and passionate about web design, digital art, fashion, and traveling.
            <br/></p>
          </div>

          <div class="member">
            <img class="us-picture" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Emi.png`} />
            <p><strong>Emi Ayada</strong></p>
            <p class="member-title">Cofounder & CTO</p>
            <p>Emi completed her MSc degree in Computer Science at the University of Tokyo. She loves bridging machine learning engineering and data science to solve challenging problems. When she is not working, Emi enjoys playing tennis, joins coding competitions, and travels!</p>
          </div>
        </div>
      )}


      </div>
      </div>
      <Footer />
  </div>
    )
  }
}


export default AboutUs;
