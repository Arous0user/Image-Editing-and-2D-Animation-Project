const blendModeSelect = document.getElementById('blend-mode');
const layer2 = document.getElementById('layer2');

blendModeSelect.addEventListener('change', (e) => {
    layer2.style.mixBlendMode = e.target.value;
});
