const expandFooter = () => {
    let footer = document.getElementById('footer');
    (footer.style.visibility == 'hidden') ? footer.style.visibility = 'visible' : footer.style.visibility = 'hidden';
};