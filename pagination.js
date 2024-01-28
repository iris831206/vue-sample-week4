export default {
    props:['pages','getData'],
    template: `            <nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled: !pages.has_pre}">
            <a class="page-link" href="#" @click="getData(pages.current_page-1)">上一頁</a>
        </li>
        <li v-for="page in pages.total_pages" :key="page"
            :class="{ 'page-item': true, 'active': page === pages.current_page }">
            <a class="page-link" href="#" @click="getData(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled: !pages.has_next}">
            <a class="page-link" href="#" @click="getData(pages.current_page+1)">下一頁</a>
        </li>

    </ul>
</nav>`,
}