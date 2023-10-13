import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const parentCss = `.parent-css:has(.child-css) {
  ...
  background-color: green;
  color: #fff;
  ...
}`;

function CssCom() {

  return (
    <Wrapper>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <p className="c-title">:has()伪类 <a href="https://www.zhangxinxu.com/wordpress/2022/08/css-has-pseudo-class/" target="_blank">参考</a></p>
          <pre>
            <code>{parentCss}</code>
          </pre>
          <div className="parent-css">
            parent-css
            <div className="child-css">child-css</div>
          </div>
          <div className="parent-css">
            parent-css
            <div className="child-css-2">child-css-2</div>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
export default CssCom;

const Wrapper = styled.div`
  .c-title {
    color: #f00;
  }
  pre {
    background: #2d2d2d;
    color: #ccc;
  }
  .parent-css:has(.child-css) {
    background-color: green;
    color: #fff;
    padding: 12px;
    border-radius: 5px;
    width: 90px;
    display: inline-block;
  }
`;


