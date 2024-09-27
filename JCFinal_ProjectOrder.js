// John Campbell
// CSC 343
// Final Project
// Restaurant Website

// Email subscribe thing talked about in main page
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

// I created an object to hold all of the menu items from the JSON files
// I also created a new field that I used to say what menu the item is part of
class MenuItemClass {

    constructor(menu_items_id, menu_item_name, menu_item_desc, menu_item_price, menu_item_stock, menu_title) {
        this.menu_items_id = menu_items_id;
        this.menu_item_name = menu_item_name;
        this.menu_item_desc = menu_item_desc;
        this.menu_item_price = menu_item_price;
        this.menu_item_stock = menu_item_stock;
        this.menu_title = menu_title
    }
}

// Vue is set-up here 
// All of the data vars are used to keep track of how the user is handling their order
const Order = {
    data() {
        return {
            allMenuItems: [],
            menuNames:['Dinner', 'Brunch', 'Desserts', 'Specials', 'CockTails'],
            selMenu: "",
            selItem: '',
            userCart: [],
            userTotal: [],
            allTotal: 0,
            orgTotal: 0,
            orderType: '',
            payType: '',
            inputChecks: ['', '', '', '', '', '', '']

        }
    },

    // On creation, we fetch the data
    created() {
        this.fetchData();
    },


    // Go through ech JSON file and fill the MenuItemClass
    methods: {
        fetchData() {
            fetch('./data/dinner_items.json')
                .then(response => response.json())
                .then(data => {
                    data.menu_items.forEach(item => {
                        let newClassItem = new MenuItemClass(item.menu_items_id, item.menu_item_name, item.menu_item_desc, item.menu_item_price, item.menu_item_stock, 'Dinner')
                        this.allMenuItems.push(newClassItem)
                    });
                });
            fetch('./data/brunch_items.json')
                .then(response => response.json())
                .then(data => {
                    data.brunch_items.forEach(item => {
                        let newClassItem = new MenuItemClass(item.menu_items_id, item.menu_item_name, item.menu_item_desc, item.menu_item_price, item.menu_item_stock, 'Brunch')
                        this.allMenuItems.push(newClassItem)
                    });
                });
            fetch('./data/specials_items.json')
                .then(response => response.json())
                .then(data => {
                    data.special_items.forEach(item => {
                        let newClassItem = new MenuItemClass(item.menu_items_id, item.menu_item_name, item.menu_item_desc, item.menu_item_price, item.menu_item_stock, 'Specials')
                        this.allMenuItems.push(newClassItem)
                    });
                });
            fetch('./data/desserts_items.json')
                .then(response => response.json())
                .then(data => {
                    data.dessert_items.forEach(item => {
                        let newClassItem = new MenuItemClass(item.menu_items_id, item.menu_item_name, item.menu_item_desc, item.menu_item_price, item.menu_item_stock, 'Desserts')
                        this.allMenuItems.push(newClassItem)
                    });
                });
            fetch('./data/cocktails_items.json')
                .then(response => response.json())
                .then(data => {
                    data.cocktail_items.forEach(item => {
                        let newClassItem = new MenuItemClass(item.menu_items_id, item.menu_item_name, item.menu_item_desc, item.menu_item_price, item.menu_item_stock, 'CockTails')
                        this.allMenuItems.push(newClassItem)
                    });
                });
            
            console.log(this.allMenuItems)
        },

        // When a user adds an item to the car, we push the item in an array, add the total, and the orgTotal is used
        // to keep track of the total without fees, we then have selItem point to nothing to unselect the item on 
        // the page
        addToCart(){
            this.userCart.push(this.selItem)
            this.allTotal += parseInt(this.selItem.menu_item_price)
            this.orgTotal = this.allTotal
            this.selItem = ''
        },

        // Here it shows the frame that we paid successfully
        payNow() {
            const payFrame = document.getElementById('payNowWindow')
            payFrame.style.display = 'grid'
            this.orgTotal = this.allTotal

        },

        // Here it handles when we remove an item, it takes the index of the item to be removed
        // and removes that one item from the userCart
        // also removes the price from the total
        removeItem(itemIndex) {
            console.log(itemIndex)
            this.allTotal -= parseInt(this.userCart[itemIndex].menu_item_price)
            this.userCart.splice(itemIndex,1)

            this.orgTotal = this.allTotal
            
            
        },

        // If we close out of the payment window, clear all values in there
        closePayFrame() {
            const payFrame = document.getElementById('payNowWindow')
            payFrame.style.display = 'none'
            this.inputChecks = ['', '', '', '', '', '', '']
            this.orderType = ''
            this.payType = ''
        }, 

        // When we handle a delivery fee, or we get rid of one
        delFee() {
            if(this.orderType == '2') {
                this.allTotal = (this.orgTotal * 0.10) + this.orgTotal
            }
            else {
                this.allTotal = this.orgTotal
            }
        },

        // Here is the submit order that has checks for if each field is filled
        submitOrder() {
            if(!this.orderType) {
                alert("Please chose an Order Type")
                return
            }
            else if(!this.payType) {
                alert("Please chose a Payment Method")
                return
            }
            else if(!this.inputChecks[0]) {
                alert("Please enter a Phone number")
                return
            }
            else if(!this.inputChecks[1]) {
                alert("Please enter an Email Address")
                return
            }
            // If we have an email, just the same checks as the footer email
            else if(this.inputChecks[1]) {
                if (!this.inputChecks[1].includes('@')) {
                    alert(`"${this.inputChecks[1]}" is not a vaild email`)
                    return
                }
                else if (!this.inputChecks[1].includes('.')) {
                    alert(`"${this.inputChecks[1]}" is not a vaild email`)
                    return
                }
            }
            else if(!this.inputChecks[2]) {
                alert("Please enter a Name")
                return
            }
            else if(!this.inputChecks[3]) {
                alert("Please choose a Time Preference")
                return
            }

            // If we choose to pay by card, check to see if we entered a card number
            else if(this.payType == '1') {
                if(!this.inputChecks[4]) {
                    alert("Please enter a card number")
                return
                }
            }

            // Closes the modal with the user info
            // Opens the other modal with the recipt and makes a random 10 digit order ID
            const payFrame = document.getElementById('payNowWindow')
            payFrame.style.display = 'none'
            this.inputChecks[5] = Math.floor(Math.random() * 9000000000) + 1000000000;
            document.getElementById('paidWindow').style.display='grid'


        

        },


        // When we close the final modal, clear out all order data
        endOrder() {
            document.getElementById('paidWindow').style.display='none'
            this.inputChecks = ['', '', '', '', '', '', '']
            this.orderType = ''
            this.payType = ''
            this.userCart = []
            this.userTotal = []
            this.allTotal = 0
            this.orgTotal = 0
        }


    }

}

Vue.createApp(Order).mount('#vueContainer')