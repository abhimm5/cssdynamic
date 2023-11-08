expression ->__  main  {% value => value[1] %}
main ->  statement __  {% value => value.filter(val => val !== null) %}
	  |  statement __ main {% value => {
	return value.flat().filter(val => val !== null)
}
%}
statement -> _ hierarchy _ components _ "=" _ csstext _ ";"  {% value => {return  {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,value:value[7]}} %} 
		   | _ hierarchy _ components _ ";" {% value => {return {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute}} %}  
		   | _ hierarchy _ "[" alphanumeric "]" _ "=" _ csstext _ ";" {% value => {return {identifier:value[1].flat(),attname:value[4],attvalue:value[9]}} %} 
		   |  root   {% value => value.filter(val => val !== null) %}
		   |  _ hierarchy _ components _ "=" _ csstext __ colon _ cssvalue _ styling _ ";" {% 
                value => {return  {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,value:value[7],pseudoClass:[value[9]+value[11],value[13]]}} 
			 %} 
           | _ hierarchy _ components __ ":" _ cssvalue _ styling _ ";" {% value => {return {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,pseudoClass:[value[5]+value[7],value[8]]}} %} 
           | _ hierarchy _ "[" alphanumeric "]" _ "=" _ csstext __ ":" _ cssvalue _ styling _ ";" {% value => {return {identifier:value[1].flat(),attname:value[4],attvalue:value[9],pseudoClass:[value[11]+value[13],value[15]]}} %} 

		
colon -> ":" {% value => value.join("") %} | "::" {% value => value.join("") %}
attr ->  class  id {% value => value.flat() %} | id class {% value => value.flat() %} | id | class 
class -> "." alphanumeric {% value => value.join("") %} | "." alphanumeric  class  {% value => [value[0].concat(value[1]),value[2]].flat() %}
id -> "#" alphanumeric {% value => value.join("") %} |  "#" alphanumeric id {% value => [value[0].concat(value[1]),value[2]].flat() %}
hierarchy ->  selector _  dab _ selector {% value => value.filter(val => val !== null) %} 
           | selector 
		   | selector _ attr  {% value => value.flat().filter(val => val !== null ) %} | attr  {% value => value.flat() %}
selector ->  alphanumeric  {% value => value.join("") %} 
          | binder {% value => value.flat().filter(val => val !== null && val !== "[" &&val !== "]") %}
          | alphanumeric _ ">" _ selector   {% value => value.flat().filter(val => val !== null ) %}
		  | binder _  ">" _ selector  {% value => value.flat().filter(val => val !== null ) %}
components ->  attribute  {% value => {return {attribute:value[0]}} %} 
            |  styling  {% value => {return {styling:value[0]}} %} 
			|  attribute _ styling  {% value => {
	            let merge = value.filter(val => val !== null)
                return {attribute:merge[0],styling:value[2]}
            }  %}
attribute -> "[" _ attribute_data _ "]" {% value => value.filter(val => val !== null && val !== "[" &&val !== "]") %} 
           | "[" _ attribute_data _ "]" _ attribute {% value => value.flat().filter(val => val !== null && val !== "[" &&val !== "]") %}
attribute_data ->   alphanumeric _ "=" _ "\"" _ alphanumeric  "\"" {% value => value.filter(val => val !== null).join("") %}
dab ->  "+" {% value => value[0] %} 
root -> _ ":root" _ kvpair {% value => value[3][2] %} 	
kvpair -> "{" __ root_data __ "}" 
root_data ->   identifier _ ":" _ literal  ";" {% value => { return {key:value[0],value:value[4].value,type:value[4].type}} %}
           |  identifier _ ":" _ literal    ";" __ root_data  {% value => { return [{key:value[0],value:value[4].value,type:value[4].type},value[7]].flat() } %} 
		   
identifier -> variable {% value => value[0] %} 
            | function {% value =>  { return {identifier:value[0][0],parameter:value[0][1]}} %}
			
literal -> closure {% value =>  {return {value:value[0],type:"closure"}} %} 
		 | array {% value =>  {return {value:value[0],type:"array"}} %} 
		 | string {% value =>  {return {value:value[0],type:"string"}} %}  
		 | styling {% value =>  {return {value:value[0],type:"styling"}} %}
		 | cssproperty {% value =>  {return {value:value[0],type:"cssproperty"}} %}

variable ->  "--" alphanumeric  {% value => value[1] %} 
function ->  variable _ r_data _ {% value => value.filter(val => val !== null) %}
closure ->  _ "{"  function_data __ "}" {% value =>   value[2] %} | _ "{"  _  "}" _ {% value => value[2] %}
array -> "[" linear_data "]" {% value => value[1] %}
string ->  "\"" .:+ "\""  {% value => value[1].join("") %} 
        |  "\""  "\""  {% value => null %}	
styling -> "{" styling_data  __ "}" 
         {% value => {
	        let v = value[1].split(";")
	        let style = {}
        	for(let i = 0 ; i < v.length;i++){
	     	   let pair = v[i].split(":")
		       style[pair[0]] = pair[1]
	        }
	        return style
         } %} 
         | "{" _ "}" {% value => value[1] %} 
		 | "{" _ variable _ "}" {% value => {return {binder:value[2],type:"variable"}} %}
		 | "{" _ function  "}" {% value => {return {binder:value[2],type:"closure"}} %}

r_data -> "(" linear_data ")" {% value => value[1] %} 
linear_data -> _ alphanumeric _ {% value => value.flat().filter(val => val !== null && val !== ",") %}  
             | _ alphanumeric _ ","  linear_data  {% value => value.flat().filter(val => val !== null && val !== ",") %}  
             | _
function_data -> __ cssvalue _  ":" _ functionliteral _ ";" {% value => { return {key:value[1],value:value[5].value,type:value[5].type}} %}
			   |  "return" _ functionliteral  {% value => { return {type:"return",value:value[2]}} %}
			   | __ "return"   {% value => { return {type:"return",value:null}} %}
               | __ cssvalue _ ":" _ functionliteral _ ";" function_data {% value => { return [{key:value[1],value:value[5].value,type:value[5].type},value[8]].flat() } %} 
functionliteral -> string {% value =>  {return {value:value[0],type:"string"}} %} 
                 | boolean {% value =>  {return {value:value[0],type:"boolean"}} %} 
				 | array {% value =>  {return {value:value[0],type:"string"}} %} 
				 | variable {% value =>  {return {value:value[0],type:"identifier"}} %} 

styling_data -> __ cssvalue _ ":" cssproperty  ";" {% value => value.filter(val => val !== null).join("") %} 
              | __ cssvalue _ ":" cssproperty ";"  styling_data {% value => value.flat().filter(val => val !== null).join("") %} 
cssvalue ->  [\w-]:+ {% value => value[0].join("") %}			  
cssproperty -> [\w\s.,()!#*+-/]:+ {% value => value[0].join("") %}

csstext -> string {% value => value[0] %} 
         | binder {% value => value[0] %}

boolean -> "true"
         | "false"

binder  -> variable {% value =>  {return {binder:value[0],type:"variable"}} %}
         | function {% value =>  {return {binder:value[0],type:"closure"}} %}
		 | variable "[" _ integer _ "]" {% value =>  {return {binder:value[0] + "-" + value[3],type:"array"}} %}
         | boolean {% value =>  {return {binder:value[0],type:"boolean"}} %}

integer -> [0-9]:+ {% value => value[0].join("") %}
alphanumeric ->  [\w]:+ {% value => value[0].join("") %}

__ -> [\s]:*     {% function(d) {return null } %}
_ -> [ \t]:*     {% function(d) {return null } %}