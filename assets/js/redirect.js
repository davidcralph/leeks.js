const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.addEventListener('DOMContentLoaded', async (event) => {
    const redirect = document.getElementById('redirect');
    await sleep(1000);
    redirect.textContent = 'in 2 seconds...';
    await sleep(1000);
    redirect.textContent = 'in 1 second...';
});