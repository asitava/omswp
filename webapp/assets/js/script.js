// Interactive behaviours for the storefront demo.
const menuToggle = document.querySelector('.menu-toggle'); const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => { const open = mainNav.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open)); }); mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mainNav.classList.remove('nav-open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
const hero = document.querySelector('.hero'), heroArt = document.querySelector('.hero-art'), slideButtons = [...document.querySelectorAll('[data-slide]')]; let slide = 0, slideTimer; function setSlide(i) { slide = i; heroArt.classList.add('is-changing'); window.setTimeout(() => { heroArt.classList.remove('slide-0', 'slide-1', 'slide-2'); heroArt.classList.add(`slide-${i}`); heroArt.classList.remove('is-changing'); }, 260); hero.classList.remove('hero-slide-0', 'hero-slide-1', 'hero-slide-2'); hero.classList.add(`hero-slide-${i}`); slideButtons.forEach((b, j) => { b.classList.toggle('active', j === i); b.setAttribute('aria-current', j === i ? 'true' : 'false'); }); } slideButtons.forEach(b => b.addEventListener('click', () => { setSlide(Number(b.dataset.slide)); window.clearInterval(slideTimer); slideTimer = window.setInterval(() => setSlide((slide + 1) % slideButtons.length), 6500); })); heroArt.classList.add('slide-0'); slideTimer = window.setInterval(() => setSlide((slide + 1) % slideButtons.length), 6500);
const tabs = [...document.querySelectorAll('.filter-tab')], cards = [...document.querySelectorAll('.product-card')]; function filterProducts(category) { tabs.forEach(t => t.classList.toggle('is-active', t.dataset.filter === category)); cards.forEach(c => c.hidden = category !== 'all' && c.dataset.category !== category); } tabs.forEach(t => t.addEventListener('click', () => filterProducts(t.dataset.filter))); document.querySelectorAll('[data-footer-filter]').forEach(a => a.addEventListener('click', () => filterProducts(a.dataset.footerFilter)));
const multipliers = { '500ml': .55, '1 Litre': 1, '5 Litres': 4.6, '10 Litres': 8.8 }; cards.forEach(card => { const select = card.querySelector('.quantity-select'), price = card.querySelector('.price'), base = Number(price.dataset.base); select.addEventListener('change', () => price.textContent = '₹ ' + Math.round(base * multipliers[select.value]).toLocaleString('en-IN')); card.querySelector('.order-button').addEventListener('click', event => { const b = event.currentTarget, original = b.textContent; b.textContent = 'Added: ' + select.value; b.classList.add('is-confirmed'); setTimeout(() => { b.textContent = original; b.classList.remove('is-confirmed'); }, 1600); }); });
const track = document.getElementById('review-track'); document.getElementById('reviews-prev').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * .85, behavior: 'smooth' })); document.getElementById('reviews-next').addEventListener('click', () => track.scrollBy({ left: track.clientWidth * .85, behavior: 'smooth' }));
const modal = document.getElementById('review-modal'); function closeModal() { modal.hidden = true; document.body.classList.remove('modal-open'); } document.getElementById('open-review').addEventListener('click', () => { modal.hidden = false; document.body.classList.add('modal-open'); document.getElementById('review-name').focus(); }); document.getElementById('close-review').addEventListener('click', closeModal); modal.addEventListener('click', e => { if (e.target === modal) closeModal(); }); document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); }); document.getElementById('review-form').addEventListener('submit', e => { e.preventDefault(); document.getElementById('review-message-status').textContent = 'Thank you! Your review has been captured in this demo.'; e.target.reset(); });
document.querySelector('.newsletter-form').addEventListener('submit', e => { e.preventDefault(); const b = e.currentTarget.querySelector('button'); b.textContent = '✓'; e.currentTarget.querySelector('input').value = ''; }); document.querySelector('.search-form').addEventListener('submit', e => { e.preventDefault(); const q = document.getElementById('site-search').value.trim().toLowerCase(), match = cards.find(c => c.textContent.toLowerCase().includes(q)); if (match) { filterProducts(match.dataset.category); match.scrollIntoView({ behavior: 'smooth', block: 'center' }); } else if (q) { const input = document.getElementById('site-search'); input.setCustomValidity('No matching product found in this demo.'); input.reportValidity(); input.setCustomValidity(''); } });

// Product detail modal: clicking a product opens a 90% width detail view with review form.
const productModal = document.getElementById('product-modal');
const closeProductModal = document.getElementById('close-product-modal');
const productModalImage = document.getElementById('product-modal-image');
const productModalTitle = document.getElementById('product-modal-title');
const productModalDescription = document.getElementById('product-modal-description');
const productModalCategory = document.getElementById('product-modal-category');
const productModalPrice = document.getElementById('product-modal-price');
const productModalRatingText = document.getElementById('product-modal-rating-text');
const productReviewForm = document.getElementById('product-review-form');
const productReviewStatus = document.getElementById('product-review-status');

function openProductModal(card) {
  const image = card.querySelector('.product-image img');
  const title = card.querySelector('.product-info h3');
  const price = card.querySelector('.price');
  const rating = card.querySelector('.product-rating span:last-child');
  const categoryNames = { mustard: 'Mustard Oil', black: 'Black Seeds Oil', yellow: 'Yellow Seeds Oil' };

  productModalImage.src = image.currentSrc || image.src;
  productModalImage.alt = image.alt;
  productModalTitle.textContent = title.textContent.trim();
  productModalDescription.textContent = card.dataset.description || 'Premium edible oil crafted with carefully selected seeds and a focus on natural quality.';
  productModalCategory.textContent = categoryNames[card.dataset.category] || 'Premium Edible Oil';
  productModalPrice.textContent = price.textContent.trim();
  productModalRatingText.textContent = rating ? rating.textContent.trim() + ' customer reviews' : 'Verified customer rating';
  productReviewStatus.textContent = '';
  productReviewForm.reset();
  productModal.hidden = false;
  document.body.classList.add('modal-open');
  window.setTimeout(() => document.getElementById('product-review-name').focus(), 120);
}

function closeProductDetails() {
  productModal.hidden = true;
  document.body.classList.remove('modal-open');
}

cards.forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('select, .order-button, a, button')) return;
    openProductModal(card);
  });
});

closeProductModal.addEventListener('click', closeProductDetails);
productModal.addEventListener('click', event => {
  if (event.target === productModal) closeProductDetails();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !productModal.hidden) closeProductDetails();
});

productReviewForm.addEventListener('submit', event => {
  event.preventDefault();
  productReviewStatus.textContent = 'Thank you! Your product review has been submitted in this demo.';
  productReviewForm.reset();
});