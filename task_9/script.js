const regexpStyle = /^[^{@]+{[^}]+}/gm;
const html = document.querySelector('#html');
const css  = document.querySelector('#css');
let btn  = document.querySelector('#submit');


html.value = `
<html> 

<head>
</head>

<body>
	<div class='squares'>
		<div class='sq_1'>╳</div>
		<div class='sq_2'>╳</div>
		<div class='sq_3'>╳</div>
		<div class='sq_4'>╳</div>
	</div>
</body>

</html>



`;

css.value = `

body {
  background-color: #6f9e80;
  margin: 0;
  font-family: sans-serif;

}

.squares{
	padding: 20px;
	display: flex;
}


.squares div{
	font-size: 50px;
}

.sq_1{
	background-color: #2980b9;
}
.sq_2{
	background-color: #8e44ad;
}
.sq_3{
	background-color: #d35400;
}
.sq_4{
	background-color: #f39c12;
}

`

const cssHandler = (cssText, dom)=>{
	[...cssText.match(regexpStyle)].map(style=>{
		const selector = style.match(/^([^{@]+){/g)[0].replaceAll(/[\n{]/g, '');
		const styleProps = style.match(/{[^}]+}/g)[0].replaceAll(/[\n{}]/g, '');
		return [selector, styleProps]
	}).forEach(style=>{
		[...dom.querySelectorAll(style[0])].forEach(elem=>elem.style = elem.style.cssText+style[1]);
	})

}

const inputHandler = ()=>{
	const result = document.createElement('iframe');
	document.querySelector('#forResult').innerText = '';
	document.querySelector('#forResult').appendChild(result);
	const innerDom = result.contentDocument;

	const htmlValue = html.value;
	const cssValue = css.value;
	const styleTag = document.createElement('style');

	styleTag.type = 'text/css';
	if (styleTag.styleSheet){
	  styleTag.styleSheet.cssText = cssValue;
	} else {
	  styleTag.appendChild(document.createTextNode(cssValue));
	}
	innerDom.write('');
	innerDom.write(htmlValue);
	try{
		cssHandler(css.value, innerDom);
	}catch{}
	// innerDom.querySelector('head').appendChild(styleTag);
};


html.addEventListener('input', inputHandler);
css.addEventListener('input', inputHandler);