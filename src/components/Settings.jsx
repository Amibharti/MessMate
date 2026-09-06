function Settings({
  menuData,
  setMenuData,
}) {

  function updateItem(
    category,
    id,
    field,
    value
  ) {

    setMenuData((previousMenu) => ({

      ...previousMenu,

      [category]:
        previousMenu[category].map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  [field]:
                    field === 'price'
                      ? Number(value)
                      : value,
                }
              : item
        ),

    }))

  }


  function addItem(category) {

    const newItem = {

      id:
        `${category}-${Date.now()}`,

      name:
        'New Food',

      price: 0,

    }


    setMenuData((previousMenu) => ({

      ...previousMenu,

      [category]: [

        ...previousMenu[category],

        newItem,

      ],

    }))

  }


  function deleteItem(
    category,
    id
  ) {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this food item?'
      )


    if (!confirmed) {
      return
    }


    setMenuData((previousMenu) => ({

      ...previousMenu,

      [category]:
        previousMenu[category].filter(
          (item) =>
            item.id !== id
        ),

    }))

  }


  function saveMenu() {

    localStorage.setItem(
      'messMatePrices',
      JSON.stringify(menuData)
    )


    alert(
      'Menu saved successfully!'
    )

  }


  function resetMenu() {

    const defaultMenu = {

      morning: [
        {
          id: 'chai',
          name: 'Chai',
          price: 10,
        },
        {
          id: 'poha',
          name: 'Poha',
          price: 30,
        },
        {
          id: 'toast',
          name: 'Toast',
          price: 15,
        },
        {
          id: 'paratha',
          name: 'Paratha',
          price: 15,
        },
        {
          id: 'dahi',
          name: 'Dahi',
          price: 25,
        },
      ],


      mainMeals: [
        {
          id: 'lunch',
          name: 'Lunch',
          price: 40,
        },
        {
          id: 'dinner',
          name: 'Dinner',
          price: 40,
        },
      ],


      evening: [
        {
          id: 'chilli-potato',
          name: 'Chilli Potato',
          price: 55,
        },
        {
          id: 'pasta',
          name: 'Pasta',
          price: 45,
        },
        {
          id: 'chowmein',
          name: 'Chowmein',
          price: 45,
        },
        {
          id: 'fries',
          name: 'Fries',
          price: 50,
        },
        {
          id: 'momos',
          name: 'Momos',
          price: 45,
        },
        {
          id: 'spring-roll',
          name: 'Spring Roll',
          price: 50,
        },
      ],

    }


    const confirmed =
      window.confirm(
        'Reset the entire menu to default?'
      )


    if (!confirmed) {
      return
    }


    setMenuData(defaultMenu)


    localStorage.setItem(
      'messMatePrices',
      JSON.stringify(
        defaultMenu
      )
    )


    alert(
      'Menu reset successfully!'
    )

  }


  function renderCategory(
    category,
    title,
    description
  ) {

    return (

      <div className="settings-section">

        <h3>
          {title}
        </h3>


        <p className="settings-description">
          {description}
        </p>


        {menuData[category].map(
          (item) => (

            <div
              className="menu-edit-row"
              key={item.id}
            >

              <div className="menu-name-input">

                <label>
                  Food Name
                </label>

                <input
                  type="text"
                  value={item.name}
                  onChange={(event) =>
                    updateItem(
                      category,
                      item.id,
                      'name',
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="menu-price-input">

                <label>
                  Price
                </label>


                <div className="price-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(event) =>
                      updateItem(
                        category,
                        item.id,
                        'price',
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              <button
                className="remove-food-button"
                onClick={() =>
                  deleteItem(
                    category,
                    item.id
                  )
                }
              >
                🗑️
              </button>

            </div>

          )
        )}


        <button
          className="add-food-button"
          onClick={() =>
            addItem(category)
          }
        >
          ➕ Add Food
        </button>

      </div>

    )

  }


  return (

    <section className="settings-page">

      <div className="settings-header">

        <h2>
          ⚙️ Settings
        </h2>

        <p>
          Manage your mess menu and prices.
        </p>

      </div>


      {renderCategory(
        'morning',
        '🌅 Morning',
        'Choose and manage your morning food options.'
      )}


      {renderCategory(
        'mainMeals',
        '🍛 Lunch & Dinner',
        'Manage lunch and dinner options.'
      )}


      {renderCategory(
        'evening',
        '🍟 Evening Snacks',
        'Add or remove your evening snack options.'
      )}


      <div className="settings-actions">

        <button
          className="save-button"
          onClick={saveMenu}
        >
          💾 Save Menu
        </button>


        <button
          className="reset-button"
          onClick={resetMenu}
        >
          🔄 Reset Default Menu
        </button>

      </div>


      <p className="settings-note">

        💡 Changes are applied immediately.
        Save the menu to keep them after
        refreshing the page.

      </p>

    </section>

  )

}

export default Settings