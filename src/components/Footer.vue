<template>
    <footer id="footer">
        <p>Faça Seu Burger &copy; {{ new Date().getFullYear() }}</p>
    </footer>
</template>

<script>
export default {
    name:"Footer"
}
</script>

<style scoped>
    #footer {
        height: 200px;
        background-color: #222;
        border-top: 4px solid #111;
        color: #fbca03;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>