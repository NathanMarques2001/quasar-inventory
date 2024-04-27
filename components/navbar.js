function createNavbar() {
  const navbar = document.createElement('header');
  navbar.classList.add('header');
  navbar.setAttribute('id', 'navbar');

  const logoImg = document.createElement('img');
  logoImg.src = '../assets/logo-fonte-branca.png';
  logoImg.alt = 'Logo Quasar Inventory';
  logoImg.classList.add('header-img-logo');

  const nav = document.createElement('nav');
  nav.classList.add('header-navbar');

  const ul = document.createElement('ul');
  ul.classList.add('header-list-links');
  ul.setAttribute('id', 'navbar-links');

  const links = [
    { text: 'Patrimônios', url: '/index.html' },
    { text: 'Áreas', url: '/pages/areas.html' }
  ];

  links.forEach(link => {
    const li = document.createElement('li');
    li.classList.add('header-navbar-link-item');

    const a = document.createElement('a');
    a.classList.add('area-link');
    a.href = link.url;
    a.textContent = link.text;

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  navbar.appendChild(logoImg);
  navbar.appendChild(nav);

  return navbar;
}

document.body.prepend(createNavbar());
