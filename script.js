const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const filter=button.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach(item=>item.classList.toggle('is-hidden',filter!=='all'&&item.dataset.category!==filter));
}));

const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
const galleryItems=[...document.querySelectorAll('.gallery-item')];
let currentImage=0;
function showImage(index){currentImage=(index+galleryItems.length)%galleryItems.length;lightboxImage.src=galleryItems[currentImage].dataset.full;lightboxImage.alt=galleryItems[currentImage].querySelector('img').alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeImage(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
galleryItems.forEach((item,index)=>item.addEventListener('click',()=>showImage(index)));
lightbox.querySelector('.lightbox-close').addEventListener('click',closeImage);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(currentImage-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(currentImage+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeImage();});
document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('open'))return;if(event.key==='Escape')closeImage();if(event.key==='ArrowLeft')showImage(currentImage-1);if(event.key==='ArrowRight')showImage(currentImage+1);});

document.getElementById('enquiryForm').addEventListener('submit',event=>{
  event.preventDefault();
  const form=new FormData(event.currentTarget);
  const message=[
    'Hello Imagery Flow Creative Studios,',
    '',
    `My name is ${form.get('name')}.`,
    `My contact: ${form.get('contact')}.`,
    `Project: ${form.get('project')}.`,
    `Details: ${form.get('message')||'I would like to discuss a project.'}`
  ].join('\n');
  const whatsappNumber='250796174175'; // Confirm this business contact before publishing.
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,'_blank','noopener');
});
document.getElementById('year').textContent=new Date().getFullYear();
