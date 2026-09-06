import { useState } from 'react'

function Calendar({
  entries,
  menuData,
  deleteEntry,
  editEntry,
}) {

  const [selectedDate, setSelectedDate] =
    useState(null)

  const [currentDate, setCurrentDate] =
    useState(new Date())


  const year =
    currentDate.getFullYear()


  const month =
    currentDate.getMonth()


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay()


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate()


  const monthName =
    currentDate.toLocaleString(
      'default',
      {
        month: 'long',
      }
    )


  const today =
    new Date()
      .toLocaleDateString(
        'en-CA'
      )


  function goToPreviousMonth() {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    )

    setSelectedDate(null)

  }


  function goToNextMonth() {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    )

    setSelectedDate(null)

  }


  function getDateString(day) {

    const monthNumber =
      String(month + 1)
        .padStart(2, '0')


    const dayNumber =
      String(day)
        .padStart(2, '0')


    return `${year}-${monthNumber}-${dayNumber}`

  }


  function getEntryForDate(date) {

    return entries.find(
      (entry) =>
        entry.date === date
    )

  }


  function getItemName(itemId) {

    const allItems = [

      ...menuData.morning,

      ...menuData.mainMeals,

      ...menuData.evening,

    ]


    const item =
      allItems.find(
        (food) =>
          food.id === itemId
      )


    return item
      ? item.name
      : itemId

  }


  function getItemNames(itemIds) {

    return itemIds
      .map((itemId) =>
        getItemName(itemId)
      )
      .join(', ')

  }


  const selectedEntry =
    selectedDate
      ? getEntryForDate(
          selectedDate
        )
      : null


  return (

    <section className="calendar-page">

      {/* HEADER */}

      <div className="calendar-page-header">

        <div>

          <span className="section-label">
            EXPENSE TRACKER
          </span>

          <h2>
            📅 Food Calendar
          </h2>

          <p>
            View and manage your daily
            mess entries.
          </p>

        </div>

      </div>


      {/* MONTH NAVIGATION */}

      <div className="calendar-month-card">

        <button
          className="month-nav-button"
          onClick={
            goToPreviousMonth
          }
          aria-label="Previous month"
        >
          ◀
        </button>


        <div className="calendar-month-title">

          <span>
            {monthName}
          </span>

          <strong>
            {year}
          </strong>

        </div>


        <button
          className="month-nav-button"
          onClick={
            goToNextMonth
          }
          aria-label="Next month"
        >
          ▶
        </button>

      </div>


      {/* LEGEND */}

      <div className="calendar-legend">

        <div>
          <span className="legend-dot recorded-dot" />
          Recorded
        </div>

        <div>
          <span className="legend-dot today-dot" />
          Today
        </div>

      </div>


      {/* WEEKDAYS */}

      <div className="calendar-weekdays-new">

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

      </div>


      {/* CALENDAR */}

      <div className="calendar-grid-new">

        {Array.from({
          length: firstDay,
        }).map(
          (_, index) => (

            <div
              className="calendar-empty-new"
              key={`empty-${index}`}
            />

          )
        )}


        {Array.from({
          length: daysInMonth,
        }).map(
          (_, index) => {

            const day =
              index + 1


            const dateString =
              getDateString(day)


            const entry =
              getEntryForDate(
                dateString
              )


            const isToday =
              dateString === today


            const isSelected =
              selectedDate ===
              dateString


            return (

              <button
                key={day}

                className={`calendar-day-new ${
                  entry
                    ? 'has-entry'
                    : ''
                } ${
                  isToday
                    ? 'today'
                    : ''
                } ${
                  isSelected
                    ? 'selected-day'
                    : ''
                }`}

                onClick={() =>
                  setSelectedDate(
                    dateString
                  )
                }
              >

                <span className="calendar-day-number">
                  {day}
                </span>


                {entry ? (

                  <span className="calendar-day-amount">
                    ₹{entry.total}
                  </span>

                ) : (

                  <span className="calendar-day-empty">
                    —
                  </span>

                )}


                {isToday && (
                  <span className="calendar-today-label">
                    Today
                  </span>
                )}

              </button>

            )

          }
        )}

      </div>


      {/* SELECTED DATE */}

      {selectedDate && (

        <div className="selected-date-new">

          <div className="selected-date-header">

            <div>

              <span className="section-label">
                SELECTED DATE
              </span>

              <h3>
                {selectedDate}
              </h3>

            </div>


            <div className="selected-date-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {selectedEntry
                  ? selectedEntry.total
                  : 0}
              </strong>

            </div>

          </div>


          {selectedEntry ? (

            <>

              <div className="selected-entry-status">

                <span>
                  ✓
                </span>

                Food entry recorded

              </div>


              <div className="selected-food-list">

                <span className="selected-food-title">
                  FOOD ITEMS
                </span>


                <div className="selected-food-tags">

                  {selectedEntry.items.map(
                    (itemId) => (

                      <span
                        key={itemId}
                        className="selected-food-tag"
                      >
                        {getItemName(
                          itemId
                        )}
                      </span>

                    )
                  )}

                </div>

              </div>


              <p className="selected-items-text">

                {getItemNames(
                  selectedEntry.items
                )}

              </p>


              <div className="selected-date-actions">

                <button
                  className="edit-button"
                  onClick={() =>
                    editEntry(
                      selectedDate
                    )
                  }
                >
                  ✏️ Edit Entry
                </button>


                <button
                  className="delete-button"
                  onClick={() => {

                    const confirmed =
                      window.confirm(
                        `Delete the entry for ${selectedDate}?`
                      )


                    if (confirmed) {

                      deleteEntry(
                        selectedDate
                      )

                      setSelectedDate(
                        null
                      )

                    }

                  }}
                >
                  🗑️ Delete Entry
                </button>

              </div>

            </>

          ) : (

            <div className="no-entry-new">

              <div className="no-entry-icon">
                📝
              </div>

              <strong>
                No entry recorded
              </strong>

              <p>
                Nothing has been added
                for this date.
              </p>

            </div>

          )}

        </div>

      )}

    </section>

  )

}

export default Calendar