import{d as r,j as e,U as $,I as P,i as j,k as A,u as x,r as u,e as L,o as D,l as B,c as S,m as O,B as E,n as W,F as M,p as z,q as V,T as _,O as q,t as H,v as Y}from"./index.b1b4d007.js";import{c as G,S as J,C as K,a as Q}from"./SplitScreen.4f48d529.js";import{B as X}from"./Button.6e100ca3.js";import{T as Z}from"./TableItemLIsts.34639f63.js";import{L as C}from"./Label.60458796.js";import{P as v}from"./PopModal.3c2260f9.js";import"./AddProducts.5c92f6d6.js";import"./WrapperIcon.0f81e73b.js";const ee=({data:a,setOpenItemModal:c,countItems:s,setOpenUserForm:o,cart:t})=>{const n="w-64 h-12 text-center flex items-center gap-8 cursor-pointer hover:bg-purple-400";return r("div",{className:"bg-purple-200 w-full h-80 flex flex-col items-center gap-2 p-4",children:[e("div",{className:n,onClick:()=>o(!0),children:e($,{})}),r("div",{onClick:()=>c(!0),className:n,children:[e(P,{className:"",content:"items",children:e("span",{className:"text-2xl",children:String(s)||""})})," "]}),e("div",{className:`${n} `,children:e(j,{})}),e("div",{className:`${n} `,children:e(A,{})}),r("div",{className:`${n} text-xl`,children:["For payment ",G((t==null?void 0:t.items)||[]),"$"]})]})},te=()=>{const{lastOrderID:a}=x(n=>n.order),[c,s]=u.exports.useState(!1),o=L();return{downLoadInvoice:async()=>{if(a!=null&&a.length)return await D.order.get(a).then(n=>{const d=URL.createObjectURL(n.data),l=document.createElement("a");l.href=d,l.setAttribute("download","file.pdf"),document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(d),s(!1)}).catch(()=>{s(!1)}).finally(()=>{s(!1),o("/")})},openModalInvoice:c,setOpenModalInvoice:s}},se=({firstName:a,lastName:c,userId:s,setOpenUserForm:o})=>{const{register:t,handleSubmit:n,formState:{errors:d},getValues:l}=B({defaultValues:{firstName:a,lastName:c,userId:s}}),m=S(),{data:p,loading:h}=x(i=>i.auth);return u.exports.useEffect(()=>{console.log(1),o(i=>!i)},[p]),r("form",{className:"m-8 w-96 h-52 flex flex-col  justify-center gap-8",onSubmit:n(i=>{!i||m(W({...i}))}),children:[r("div",{children:[e("div",{className:"mb-2 block",children:e(C,{htmlFor:"small",value:"First Name"})}),e(O,{...t("firstName"),id:"small",type:"text",sizing:"sm"})]}),r("div",{children:[e("div",{className:"mb-2 block",children:e(C,{htmlFor:"small",value:"Last Name"})}),e(O,{...t("lastName"),id:"small",type:"text",sizing:"sm"})]}),e(E,{className:" ",type:"submit",color:"purple",children:h?"loading....":" submit"})]})},ae=({onClick:a})=>r("div",{className:"w-80 h-56 flex flex-col items-center gap-8",children:[e("h4",{className:"from-neutral-600 text-2xl text-black",children:"Download Your Invoice"}),e("button",{className:"p-4 bg-violet-600 rounded-md text-xl text-white",onClick:a,children:"Download"}),r("div",{className:"flex flex-col gap-2",children:[e("p",{children:"Thank you for purchasing from us.  "}),e("strong",{className:"text-center",children:"We'd love to see you again"})]})]}),ne=({openItemModal:a,openUserForm:c,setOpenItemModal:s,setOpenUserForm:o,openModalInvoice:t,setOpenModalInvoice:n,downLoadInvoice:d})=>{const{auth:l,cart:m}=x(p=>p);return r(M,{children:[m.cart&&e(v,{isOpen:a,setIsOpen:s,children:e(Z,{items:m.cart.items})}),l.data&&e(v,{isOpen:c,setIsOpen:o,children:e(se,{...l.data,setOpenUserForm:o})}),e(v,{isOpen:t,setIsOpen:n,children:e(ae,{onClick:d})})]})},he=()=>{var N;const a=S(),{auth:c,cart:s,order:o}=x(f=>f),{data:t}=c,n=L();u.exports.useEffect(()=>{t!=null&&t.userId&&(a(z(t==null?void 0:t.userId)),a(V(t==null?void 0:t.userId)))},[t==null?void 0:t.userId]);const d=((N=s.cart)==null?void 0:N.items.length)||0,[l,m]=u.exports.useState(!1),[p,h]=u.exports.useState(!1),{showMenu:b,setShowMenu:i,showCart:g,showUserToggle:oe}=u.exports.useContext(_),{downLoadInvoice:U,openModalInvoice:F,setOpenModalInvoice:I}=te(),R=()=>{var f,y,k,w;if((f=o.payment)!=null&&f.length||(n("/order/checkout/payment"),a(H(!0))),c.data&&s.cart&&s.cart.items.length>0&&o.payment&&((y=o.payment)==null?void 0:y.length)>0){const T={cartRef:(k=s.cart)==null?void 0:k._id,customerRef:c.data.userId,dateDelivery:"",items:(w=s.cart)==null?void 0:w.items,paymentRef:{idPayment:o.payment[0]._id}};a(Y(T)),I(!0)}};return r(M,{children:[r(J,{children:[r("div",{className:`${g?"hidden md:block":"block"}`,children:[e(K,{setShowMenu:i,showMenu:b}),e(q,{})]}),r("div",{className:"  md:h-96 flex flex-col gap-8",children:[e("span",{className:"block md:hidden",children:e(Q,{cart:s.cart})}),e("div",{className:`${g?"hidden md:block":"block"}`,children:e(ee,{data:t,setOpenItemModal:m,countItems:d,setOpenUserForm:h,cart:s.cart})}),e(X,{className:`${g?"hidden md:block":"block"} bg-red-600 py-4 px-36 text-xl text-white rounded-lg self-center`,content:"Order",onClick:()=>R()})]})]}),e(ne,{downLoadInvoice:U,openItemModal:l,openModalInvoice:F,openUserForm:p,setOpenItemModal:m,setOpenModalInvoice:I,setOpenUserForm:h})]})};export{he as default};
