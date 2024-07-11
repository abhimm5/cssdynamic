# Dynamic Style Sheet
Preprocessor language DCSS (Dynamic Style Sheet)

## Install
Download and write in basic CSS syntax this will generate tag dynamically

## Usage
### Create tag with inner text

`body = Hello World` ---> `<body>Hello World</body>`<br>
`body>div = Hellow World` ---> `<body><div>Hello World</div></body>`

### Create attribute 

`body>div[id = "test"] = Hello World` ---> `<body><div id="test">Hello World</div></body>`

### Create style 
<pre>
  
body > div {
   color:blue;
   background:green;
   font-size:30px
} = This is green text

</pre>

## Whole page demo

<pre>

head>title = My website
body>h1 = My heading 
body>p = This is a paragraph 
body>div>div = my content
body>div>>div = My paragraphs
  
</pre>

Will generate below

```html
<html>
<head>
    <title>My website</title>
</head>
<body>
    <h1>My heading</h1>
    <p>This is a paragraph</p>
    <div>
        <div>my content</div>
        <div>My paragraphs</div>
    </div>
</body>
</html>
```
