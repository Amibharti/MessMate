import { useEffect, useState } from 'react'

function AddEntry({
  menuData,
  entries,
  saveEntry,
  editingDate,
  setEditingDate,
  cancelEdit,
}) {

  const today =
    new Date().toLocaleDateString('en-CA')


  const [selectedDate, setSelectedDate] =
    useState(editingDate || today)


  const [selectedMorning, setSelectedMorning] =
    useState(null)


  const [selectedMainMeals, setSelectedMainMeals] =
    useState([])


  const [selectedEvening, setSelectedEvening] =
    useState([])


  const entryDate =
    editingDate || selectedDate


  useEffect(() => {

    const selectedEntry =
      entries.find(
        (entry) =>
          entry.date === entryDate
      )


    if (selectedEntry) {

      const morningIds =
        selectedEntry.items.filter(
          (id) =>
            menuData.morning.some(
              (item) =>
                item.id === id
            )
        )


      const mainMealIds =
        selectedEntry.items.filter(
          (id) =>
            menuData.mainMeals.some(
              (item) =>
                item.id === id
            )
        )


      const eveningIds =
        selectedEntry.items.filter(
          (id) =>
            menuData.evening.some(
              (item) =>
                item.id === id
            )
        )


      setSelectedMorning(
        morningIds[0] || null
      )


      setSelectedMainMeals(
        mainMealIds
      )


      setSelectedEvening(
        eveningIds
      )

    } else {

      setSelectedMorning(null)

      setSelectedMainMeals([])

      setSelectedEvening([])

    }

  }, [
    entries,
    entryDate,
    menuData,
  ])


  function handleDateChange(event) {

    setSelectedDate(
      event.target.value
    )

  }


  function selectMorning(id) {

    if (
      selectedMorning === id
    ) {

      setSelectedMorning(null)

    } else {

      setSelectedMorning(id)

    }

  }


  function toggleMainMeal(id) {

    setSelectedMainMeals(
      (previousItems) => {

        if (
          previousItems.includes(id)
        ) {

          return previousItems.filter(
            (itemId) =>
              itemId !== id
          )

        }


        return [
          ...previousItems,
          id,
        ]

      }
    )

  }


  function toggleEvening(id) {

    setSelectedEvening(
      (previousItems) => {

        if (
          previousItems.includes(id)
        ) {

          return previousItems.filter(
            (itemId) =>
              itemId !== id
          )

        }


        return [
          ...previousItems,
          id,
        ]

      }
    )

  }


  const selectedItems = [

    ...(selectedMorning
      ? [selectedMorning]
      : []),

    ...selectedMainMeals,

    ...selectedEvening,

  ]


  const allItems = [

    ...menuData.morning,

    ...menuData.mainMeals,

    ...menuData.evening,

  ]


  const total =
    allItems
      .filter((item) =>
        selectedItems.includes(
          item.id
        )
      )
      .reduce(
        (sum, item) =>
          sum + item.price,
        0
      )


  function handleSave() {

    const entry = {

      date: entryDate,

      items: selectedItems,

      total: total,

    }


    saveEntry(entry)


    if (editingDate) {

      alert(
        'Entry updated successfully!'
      )

      setEditingDate(null)

      cancelEdit()

    } else {

      alert(
        `Entry saved for ${entryDate}!`
      )

      setSelectedMorning(null)

      setSelectedMainMeals([])

      setSelectedEvening([])

    }

  }


  function getFoodIcon(
    category,
    item
  ) {

    const icons = {

      chai: '☕',
      poha: '🍚',
      toast: '🍞',
      paratha: '🫓',
      dahi: '🥣',

      lunch: '🍛',
      dinner: '🍽️',

      'chilli-potato': '🥔',
      pasta: '🍝',
      chowmein: '🍜',
      fries: '🍟',
      momos: '🥟',
      'spring-roll': '🥠',

    }


    return (
      icons[item.id] ||
      (
        category === 'morning'
          ? '🌅'
          : category === 'mainMeals'
            ? '🍛'
            : '🍟'
      )
    )

  }


  function renderFoodCard(
    item,
    category,
    isSelected,
    onClick
  ) {

    return (

      <button
        key={item.id}
        className={`food-card-new ${
          isSelected
            ? 'selected'
            : ''
        }`}
        onClick={onClick}
      >

        <div className="food-card-icon">

          {getFoodIcon(
            category,
            item
          )}

        </div>


        <div className="food-card-info">

          <span className="food-name-new">
            {item.name}
          </span>

          <span className="food-price-new">
            ₹{item.price}
          </span>

        </div>


        <div className="food-check">

          {isSelected
            ? '✓'
            : ''}

        </div>

      </button>

    )

  }


  return (

    <section className="add-page">

      {/* HEADER */}

      <div className="add-page-header">

        <div>

          <span className="section-label">
            {editingDate
              ? 'EDIT ENTRY'
              : 'DAILY TRACKER'}
          </span>

          <h2>

            {editingDate
              ? '✏️ Edit Food Entry'
              : '➕ Add Food Entry'}

          </h2>

          <p>

            {editingDate
              ? `Editing food for ${editingDate}`
              : 'Record what you ate today.'}

          </p>

        </div>

      </div>


      {/* DATE */}

      {!editingDate && (

        <div className="date-selector-new">

          <div className="date-selector-icon">
            📅
          </div>


          <div className="date-selector-content">

            <label htmlFor="food-date">
              Food Date
            </label>

            <span>
              Choose the day you want
              to record.
            </span>

          </div>


          <input
            id="food-date"
            type="date"
            value={selectedDate}
            max={today}
            onChange={handleDateChange}
          />

        </div>

      )}


      {editingDate && (

        <div className="editing-date-banner">

          <span>
            📅
          </span>

          <div>

            <strong>
              {editingDate}
            </strong>

            <small>
              You are editing this day's entry.
            </small>

          </div>

        </div>

      )}


      {/* MORNING */}

      <div className="food-section">

        <div className="food-section-header">

          <div>

            <span className="section-number">
              01
            </span>

            <div>

              <h3>
                🌅 Morning
              </h3>

              <p>
                Select one option
              </p>

            </div>

          </div>

          <span className="selection-count">

            {selectedMorning
              ? '1 selected'
              : '0 selected'}

          </span>

        </div>


        <div className="food-grid-new">

          {menuData.morning.map(
            (item) =>
              renderFoodCard(
                item,
                'morning',
                selectedMorning ===
                  item.id,
                () =>
                  selectMorning(
                    item.id
                  )
              )
          )}

        </div>

      </div>


      {/* LUNCH & DINNER */}

      <div className="food-section">

        <div className="food-section-header">

          <div>

            <span className="section-number">
              02
            </span>

            <div>

              <h3>
                🍛 Lunch & Dinner
              </h3>

              <p>
                Select what you ate
              </p>

            </div>

          </div>

          <span className="selection-count">

            {selectedMainMeals.length}{' '}
            selected

          </span>

        </div>


        <div className="food-grid-new">

          {menuData.mainMeals.map(
            (item) =>
              renderFoodCard(
                item,
                'mainMeals',
                selectedMainMeals.includes(
                  item.id
                ),
                () =>
                  toggleMainMeal(
                    item.id
                  )
              )
          )}

        </div>

      </div>


      {/* EVENING */}

      <div className="food-section">

        <div className="food-section-header">

          <div>

            <span className="section-number">
              03
            </span>

            <div>

              <h3>
                🍟 Evening Snacks
              </h3>

              <p>
                Select any snacks you had
              </p>

            </div>

          </div>

          <span className="selection-count">

            {selectedEvening.length}{' '}
            selected

          </span>

        </div>


        <div className="food-grid-new">

          {menuData.evening.map(
            (item) =>
              renderFoodCard(
                item,
                'evening',
                selectedEvening.includes(
                  item.id
                ),
                () =>
                  toggleEvening(
                    item.id
                  )
              )
          )}

        </div>

      </div>


      {/* TOTAL */}

      <div className="total-box-new">

        <div className="total-info">

          <span>
            TODAY'S BILL
          </span>

          <strong>
            ₹{total}
          </strong>

          <small>

            {selectedItems.length === 0
              ? 'No food selected'
              : `${selectedItems.length} item${
                  selectedItems.length > 1
                    ? 's'
                    : ''
                } selected`}

          </small>

        </div>


        <div className="total-actions">

          <button
            className="save-button-new"
            onClick={handleSave}
          >

            {editingDate
              ? '💾 Update Entry'
              : '💾 Save Entry'}

          </button>


          {editingDate && (

            <button
              className="cancel-button-new"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          )}

        </div>

      </div>

    </section>

  )

}

export default AddEntry