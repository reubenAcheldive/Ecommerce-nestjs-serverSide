import{c as h,j as e,d as c,Q as n,X as P,u as m,w as t,r as i,Y as x,Z as y}from"./index.b1b4d007.js";import{P as f}from"./ProductForm.fa4a275e.js";import{P as C}from"./PopModal.3c2260f9.js";import"./Label.60458796.js";const k=({editProduct:l,setOpenItemModal:d,_id:a})=>{const s=h();return e("div",{className:"flex justify-start",children:c(n,{inline:!0,label:"",children:[e(n.Item,{onClick:()=>l(),children:e("a",{className:"block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",children:"Edit"})}),e(n.Item,{onClick:()=>a&&s(P(a)),children:e("a",{className:"block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white",children:"Delete"})})]})})},v=(l,d)=>{var a;return(a=l.find(s=>s._id===d))==null?void 0:a.nameCategory},w=({p:l,setEditProduct:d,setOpenItemModal:a})=>{const{categories:s}=m(r=>r.admin),o=r=>{d(r),a(!0)};return e("div",{children:c(t,{className:"   ",children:[c(t.Head,{className:"sticky top-0",children:[e(t.HeadCell,{children:"Product name"}),e(t.HeadCell,{children:"Description"}),e(t.HeadCell,{children:"Category"}),e(t.HeadCell,{children:"Price"}),e(t.HeadCell,{children:"Picture"}),e(t.HeadCell,{children:"Edit"})]}),e(t.Body,{className:"divide-y  ",children:l==null?void 0:l.map(r=>c(t.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800   ",children:[e(t.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:r.name}),e(t.Cell,{children:r.description}),e(t.Cell,{children:v(s,r.categoryRef)}),e(t.Cell,{children:r.price}),e(t.Cell,{children:e("img",{src:r.imgUrl,width:40,height:40})}),e(t.Cell,{children:e(k,{editProduct:()=>o(r),setOpenItemModal:a,_id:r._id})})]},r._id))})]})})},j=()=>{const l=h(),{products:d}=m(p=>p.admin),[a,s]=i.exports.useState(1),[o,r]=i.exports.useState(!1),[u,g]=i.exports.useState(null);return i.exports.useEffect(()=>{l(x({page:a}))},[a]),c("div",{className:"w-full h-full flex flex-col gap-4",children:[e("div",{className:"w-full    ",children:e(w,{p:d==null?void 0:d.getProducts,setEditProduct:g,setOpenItemModal:r})}),e(y,{currentPage:a,totalPages:100,onPageChange:s}),e(C,{isOpen:o,setIsOpen:r,children:e(f,{closeModal:r,editProduct:u||null})})]})};export{j as default};