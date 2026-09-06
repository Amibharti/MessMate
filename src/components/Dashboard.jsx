function Dashboard({
  entries,
  menuData,
  setActivePage,
}) {

  const today =
    new Date().toLocaleDateString('en-CA')


  const todayEntry =
    entries.find(
      (entry) =>
        entry.date === today
    )


  const todayTotal =
    todayEntry
      ? todayEntry.total
      : 0


  const currentMonth =
    today.slice(0, 7)


  const monthlyEntries =
    entries.filter(
      (entry) =>
        entry.date.startsWith(
          currentMonth
        )
    )


  const monthlyTotal =
    monthlyEntries.reduce(
      (sum, entry) =>
        sum + entry.total,
      0
    )


  const currentDate =
    new Date()


  const daysInMonth =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate()


  const daysPassed =
    currentDate.getDate()


  const daysRecorded =
    monthlyEntries.length


  const missingDays =
    Math.max(
      daysPassed - daysRecorded,
      0
    )


  const averageDailyBill =
    daysRecorded > 0
      ? monthlyTotal / daysRecorded
      : 0


  const averagePerCalendarDay =
    daysPassed > 0
      ? monthlyTotal / daysPassed
      : 0


  const estimatedMonthlyBill =
    averagePerCalendarDay *
    daysInMonth


  const progress =
    estimatedMonthlyBill > 0
      ? Math.min(
          (monthlyTotal /
            estimatedMonthlyBill) *
            100,
          100
        )
      : 0


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


  const recentEntries =
    [...monthlyEntries]
      .sort((a, b) =>
        b.date.localeCompare(
          a.date
        )
      )
      .slice(0, 5)


  const monthName =
    currentDate.toLocaleString(
      'default',
      {
        month: 'long',
      }
    )


  return (

    <section className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            YOUR MESS DASHBOARD
          </p>

          <h2>
            Good day! 👋
          </h2>

          <p>
            Here's your MessMate summary
            for {monthName}.
          </p>

        </div>

        <div className="dashboard-date">
          📅 {today}
        </div>

      </div>


      {/* TODAY CARD */}

      <div className="today-card">

        <div className="today-card-left">

          <span>
            Today's Spending
          </span>

          <strong>
            ₹{todayTotal}
          </strong>

          <small>
            {todayEntry
              ? `${todayEntry.items.length} food item${
                  todayEntry.items.length > 1
                    ? 's'
                    : ''
                } recorded`
              : 'Nothing recorded yet'}
          </small>

        </div>


        <div className="today-card-right">

          {todayEntry ? (

            <div className="today-complete">

              <span>
                ✓
              </span>

              Recorded

            </div>

          ) : (

            <button
              className="quick-add-button"
              onClick={() =>
                setActivePage('add')
              }
            >
              + Add Today's Food
            </button>

          )}

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            💰
          </div>

          <span>
            This Month
          </span>

          <strong>
            ₹{monthlyTotal}
          </strong>

          <small>
            Total spent
          </small>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            📈
          </div>

          <span>
            Estimated Total
          </span>

          <strong>
            ₹{estimatedMonthlyBill.toFixed(0)}
          </strong>

          <small>
            Month-end estimate
          </small>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            🧾
          </div>

          <span>
            Average / Day
          </span>

          <strong>
            ₹{averageDailyBill.toFixed(0)}
          </strong>

          <small>
            Recorded days
          </small>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            📅
          </div>

          <span>
            Days Recorded
          </span>

          <strong>
            {daysRecorded}
          </strong>

          <small>
            Out of {daysPassed} passed
          </small>

        </div>

      </div>


      {/* SPENDING OVERVIEW */}

      <div className="spending-overview">

        <div className="overview-header">

          <div>

            <span className="overview-label">
              MONTHLY OVERVIEW
            </span>

            <h3>
              📊 Spending Progress
            </h3>

            <p>
              {daysPassed} of {daysInMonth}{' '}
              days passed
            </p>

          </div>


          <div className="overview-percentage">

            <strong>
              {progress.toFixed(0)}%
            </strong>

            <span>
              estimated
            </span>

          </div>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <div className="overview-stats">

          <div>
            <span>Spent</span>
            <strong>
              ₹{monthlyTotal}
            </strong>
          </div>


          <div>
            <span>Recorded</span>
            <strong>
              {daysRecorded} days
            </strong>
          </div>


          <div>
            <span>Missing</span>
            <strong>
              {missingDays} days
            </strong>
          </div>


          <div>
            <span>Daily average</span>
            <strong>
              ₹
              {averagePerCalendarDay.toFixed(
                0
              )}
            </strong>
          </div>

        </div>

      </div>


      {/* TODAY'S FOOD */}

      <div className="today-status">

        <div className="section-title-row">

          <div>

            <span className="section-label">
              TODAY
            </span>

            <h3>
              🍽️ Today's Food
            </h3>

          </div>

        </div>


        {todayEntry ? (

          <>

            <div className="status-success">

              <span>
                ✓
              </span>

              Today's entry is saved

            </div>


            <div className="food-summary">

              {todayEntry.items.map(
                (itemId) => (

                  <span
                    key={itemId}
                    className="food-tag"
                  >

                    {getItemName(
                      itemId
                    )}

                  </span>

                )
              )}

            </div>


            <div className="today-total-line">

              <span>
                Total bill
              </span>

              <strong>
                ₹{todayEntry.total}
              </strong>

            </div>

          </>

        ) : (

          <>

            <div className="status-empty">

              <span>
                📝
              </span>

              No food recorded today

            </div>


            <p>
              Add your food for today to
              start tracking your spending.
            </p>


            <button
              className="save-button"
              onClick={() =>
                setActivePage('add')
              }
            >
              Add Today's Food
            </button>

          </>

        )}

      </div>


      {/* RECENT ENTRIES */}

      <div className="recent-entries">

        <div className="recent-header">

          <div>

            <span className="section-label">
              HISTORY
            </span>

            <h3>
              🕘 Recent Entries
            </h3>

          </div>


          {monthlyEntries.length > 5 && (

            <button
              className="text-button"
              onClick={() =>
                setActivePage('calendar')
              }
            >
              View All →
            </button>

          )}

        </div>


        {recentEntries.length === 0 ? (

          <div className="recent-empty">

            <div className="empty-icon">
              🍽️
            </div>

            <p>
              No entries recorded this month.
            </p>

            <button
              className="save-button"
              onClick={() =>
                setActivePage('add')
              }
            >
              Add Your First Entry
            </button>

          </div>

        ) : (

          <div className="recent-list">

            {recentEntries.map(
              (entry) => (

                <div
                  className="recent-entry"
                  key={entry.date}
                >

                  <div className="recent-entry-date">

                    <strong>
                      {entry.date}
                    </strong>

                    <p>

                      {entry.items
                        .map(
                          (itemId) =>
                            getItemName(
                              itemId
                            )
                        )
                        .join(', ')}

                    </p>

                  </div>


                  <strong className="recent-entry-total">
                    ₹{entry.total}
                  </strong>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <div className="recent-header">

          <div>

            <span className="section-label">
              SHORTCUTS
            </span>

            <h3>
              ⚡ Quick Actions
            </h3>

          </div>

        </div>


        <div className="quick-action-grid">

          <button
            onClick={() =>
              setActivePage('add')
            }
          >

            <span className="action-icon">
              ➕
            </span>

            <span>
              Add Food
            </span>

          </button>


          <button
            onClick={() =>
              setActivePage('calendar')
            }
          >

            <span className="action-icon">
              📅
            </span>

            <span>
              Calendar
            </span>

          </button>


          <button
            onClick={() =>
              setActivePage('bill')
            }
          >

            <span className="action-icon">
              💰
            </span>

            <span>
              Monthly Bill
            </span>

          </button>


          <button
            onClick={() =>
              setActivePage('settings')
            }
          >

            <span className="action-icon">
              ⚙️
            </span>

            <span>
              Settings
            </span>

          </button>

        </div>

      </div>

    </section>

  )

}

export default Dashboard