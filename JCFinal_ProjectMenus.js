// John Campbell
// CSC 343
// Final Project
// Restaurant Website

// One of thing I regret is having this email on all of my pages so now each
// JS file has to have this code to handle entering an email
document.getElementById('submitEmail').addEventListener('click', handleSubmitEmail)
function handleSubmitEmail() {
    const email = document.getElementById('submitField').value

    if (email == '') {
        alert("No email entered")
        return
    }
    else if (!email.includes('@')) {
        alert(`"${email}" is not a vaild email`)
        return
    }
    else if (!email.includes('.')) {
        alert(`"${email}" is not a vaild email`)
        return
    }

    const modal = document.getElementById('modalID');


    modal.style.display = 'block';

    document.getElementById('subText').innerHTML = `We will reach you with up-to-date on news <br> by email: ${email}`
    document.getElementById('submitField').value = ''

    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000);
}

// Here is the React class, the constructor holds data for each of the menu items, the selected menu, and the menu titles
class JCMenus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Brunch: [],
            Dinner: [],
            Specials: [],
            CockTails: [],
            Desserts: [],
            selMenu: 0,
            Menus: ['Dinner', 'Brunch', 'Desserts', 'Specials', 'CockTails'],
            isLoading: true,

        }
    }

    // Function to handle when the user changes a menu, display that selected table
    changeMenu = e => {
        let val = parseInt(e.target.value)

        document.getElementById('dinnerTable').style.display ='none'
        document.getElementById('brunchTable').style.display ='none'
        document.getElementById('dessertsTable').style.display ='none'
        document.getElementById('specialsTable').style.display ='none'
        document.getElementById('cocktailsTable').style.display ='none'

        switch (val) {
            case 0:
                document.getElementById('dinnerTable').style.display ='block'
                break;
            case 1:
                document.getElementById('brunchTable').style.display ='block'
                break;
            case 2:
                document.getElementById('dessertsTable').style.display ='block'
                break;
            case 3:
                document.getElementById('specialsTable').style.display ='block'
                break;
            case 4:
                document.getElementById('cocktailsTable').style.display ='block'
                break;
            default:
                document.getElementById('dinnerTable').style.display ='block'
        }
        
    }

    // Fetch all of the menu items from each of the json files
    componentDidMount() {
        fetch('./data/dinner_items.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ Dinner: data.menu_items })
                this.setState({ isLoading: false })
                this.setState({ menuInTable: this.state.Dinner });
            });
        fetch('./data/brunch_items.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ Brunch: data.brunch_items })
                this.setState({ isLoading: false })
            });
        fetch('./data/desserts_items.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ Desserts: data.dessert_items })
                this.setState({ isLoading: false })
            });
        fetch('./data/specials_items.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ Specials: data.special_items })
                this.setState({ isLoading: false })
            });
        fetch('./data/cocktails_items.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ CockTails: data.cocktail_items })
                this.setState({ isLoading: false })
            });
        
    }

    // Here is is used to actually create all of the grids when the DOM is created
    // Also by default uses the dinner menu on load
    componentDidUpdate() {
        document.getElementById(`men_${this.state.selMenu}`).checked = 'true'
        this.initializeGrids();
    }

    // So I my orignal idea was to have one gridjs and swap out the data inside of the table
    // For whatever reason, the gridjs would not clear when I tried to clear it
    // I tried making the gridjs a child of an element and then clear the parent's
    // InnerHTML, but the old data still showed. My next solution was to instead
    // have 5 divs and just hide/show when the menu is selected. I also have some issues here
    // where sometimes it will say that the gridjs failed to load because the element it is 
    // trying to load into already as elements in it, which does not make sense to me since I
    // know they are clear. I would say this happens about 25% of the time, a reload of the page
    // somtimes does the trick
    initializeGrids() {

        try {
            const dinnerData = this.state.Dinner.map((item) => [
                item.menu_item_name,
                item.menu_item_desc,
                `$${item.menu_item_price}`
            ]);
            new gridjs.Grid({
                columns: ['Item Name', 'Details', 'Price'],
                data: dinnerData,
                search: true,
            }).render(document.getElementById('dinnerGrid'));
            document.getElementById('dinnerTable').style.display ='none'


            const brunchData = this.state.Brunch.map((item) => [
                item.menu_item_name,
                item.menu_item_desc,
                `$${item.menu_item_price}`
            ]);
            new gridjs.Grid({
                columns: ['Menu', 'Details', 'Price'],
                data: brunchData,
                search: true,
            }).render(document.getElementById('brunchGrid'));
            document.getElementById('brunchTable').style.display ='none'


            const dessertsData = this.state.Desserts.map((item) => [
                item.menu_item_name,
                item.menu_item_desc,
                `$${item.menu_item_price}`
            ]);
            new gridjs.Grid({
                columns: ['Menu', 'Details', 'Price'],
                data: dessertsData,
                search: true,
            }).render(document.getElementById('dessertsGrid'));
            document.getElementById('dessertsTable').style.display ='none'


            const specialsData = this.state.Specials.map((item) => [
                item.menu_item_name,
                item.menu_item_desc,
                `$${item.menu_item_price}`
            ]);
            new gridjs.Grid({
                columns: ['Menu', 'Details', 'Price'],
                data: specialsData,
                search: true,
            }).render(document.getElementById('specialsGrid'));
            document.getElementById('specialsTable').style.display ='none'


            const cocktailsData = this.state.CockTails.map((item) => [
                item.menu_item_name,
                item.menu_item_desc,
                `$${item.menu_item_price}`
            ]);
            new gridjs.Grid({
                columns: ['Menu', 'Details', 'Price'],
                data: cocktailsData,
                search: true,
            }).render(document.getElementById('cocktailsGrid'));
            document.getElementById('cocktailsTable').style.display ='none'

            document.getElementById('dinnerTable').style.display ='block'

        }catch(Error){
            console.log("Grid Error")
            this.initializeGrids()
        }
    }


    // Here is the render of the page
    render() {
        if (this.state.isLoading) {

            return (<p>Still Loading Data</p>)
        } else {
            return (
                <>
                {/* Creates a a section of the Menu titles */}
                    <div className='menu_container'>
                        <div className='menu_opts'>
                            {this.state.Menus.map((men, i) => {
                                return (
                                    <div key={'men_div_' + i} className='itemRow'>
                                        <input key={`rad_${i}`} id={`men_${i}`} type="radio" name="menus" value={i} onChange={this.changeMenu} />
                                        <label key={`men_label_${i}`} htmlFor={`men_${i}`}>
                                            {men}
                                        </label>
                                    </div>
                                )

                            })}

                        </div>
                    </div>
                    {/* A section to tell the user to try to reload the page */}
                    <div className='tryReload'>
                        <h1>Menu Contains no Items?</h1>
                        <h1>Try reloading the page!</h1>
                    </div>
                    
                    {/* The section for all of the grids */}
                    <div id='dinnerTable' className='div_dinnerTable'>
                        <div id='dinnerGrid'></div>
                    </div>
                    <div id='brunchTable' className='div_brunchTable'>
                        <div id='brunchGrid'></div>
                    </div>
                    <div id='dessertsTable' className='div_dessertsTable'>
                        <div id='dessertsGrid'></div>
                    </div>
                    <div id='specialsTable' className='div_specialsTable'>
                        <div id='specialsGrid'></div>
                    </div>
                    <div id='cocktailsTable' className='div_cocktailsTable'>
                        <div id='cocktailsGrid'></div>
                    </div>

                </>
            )
        }
    }
}

const createMenus = ReactDOM.createRoot(document.querySelector('#menuSections'));
createMenus.render(<JCMenus />)