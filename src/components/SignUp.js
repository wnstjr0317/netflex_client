import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const IP_ADDRESS = "127.0.0.1";

import {
  GlobalStyleSignUp,
  WrapperSignUp,
  InputSignUp,
  ButtonSignUp,
} from "./SignUpCss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickName: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    const { email, password, nickName } = this.state;
    const { isLogin, userInfo } = this.props;
    if (!isLogin) {
      return (
        <>
          <GlobalStyleSignUp />
          <WrapperSignUp>
            <div>
              <center>
                <img
                  src={`https://fontmeme.com/permalink/201118/88710b88617466e8a7ba4c7844f9623a.png`}
                />
                <br />
                <br />
                <br />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email && password && nickName) {
                      axios
                        .post(`http://${IP_ADDRESS}:5000/user/signup`, {
                          email: email,
                          password: password,
                          nickName: nickName,
                        })
                        .then(() => {
                          this.props.history.push(`/`);
                        })
                        .catch((err) => console.log(err));
                    } else {
                      alert("가입이 완료되지 않았습니다.");
                    }
                  }}
                >
                  <div>
                    {" "}
                    <InputSignUp
                      type='email'
                      placeholder='이메일 주소'
                      onChange={this.handleInputValue("email")}
                    ></InputSignUp>
                  </div>
                  <div>
                    {" "}
                    <InputSignUp
                      onChange={this.handleInputValue("password")}
                      type='password'
                      placeholder='비밀번호'
                    ></InputSignUp>
                  </div>
                  <div>
                    <InputSignUp
                      onChange={this.handleInputValue("nickName")}
                      placeholder='닉네임'
                    ></InputSignUp>
                  </div>
                  <br />
                  <br />
                  <div>
                    <Link to={`/`}>이미 아이디가 있으신가요?</Link>
                  </div>
                  <br />
                  <br />
                  <ButtonSignUp type='submit'>시작하기</ButtonSignUp>
                </form>
              </center>
            </div>
          </WrapperSignUp>
        </>
      );
    } else {
      return <div></div>;
    }
  }
}
SignUp.propTypes = {
  history: PropTypes.object,
  userInfo: PropTypes.object,
  isLogin: PropTypes.bool,
};
export default withRouter(SignUp);
