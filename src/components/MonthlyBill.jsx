import { useState } from 'react'

function MonthlyBill({
  entries,
  menuData,
}) {

  const [currentDate, setCurrentDate] =
    useState(new Date())


  const year =
    currentDate.getFullYear()


  const month =
    currentDate.getMonth()


  const monthKey =
    `${year}-${String(
      month + 1
    ).padStart(2, '0')}`


  const monthName =
    currentDate.toLocaleString(
      'default',
      {
        month: 'long',
        year: 'numeric',
      }
    )


  const monthlyEntries =
    entries
      .filter((entry) =>
        entry.date.startsWith(
          monthKey
        )
      )
      .sort((a, b) =>
        a.date.localeCompare(
          b.date
        )
      )


  const monthlyTotal =
    monthlyEntries.reduce(
      (sum, entry) =>
        sum + entry.total,
      0
    )


  const daysRecorded =
    monthlyEntries.length


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate()


  const today =
    new Date()


  const currentMonthKey =
    today
      .toLocaleDateString(
        'en-CA'
      )
      .slice(0, 7)


  const isCurrentMonth =
    monthKey ===
    currentMonthKey


  const daysPassed =
    isCurrentMonth
      ? today.getDate()
      : daysInMonth


  const missingDays =
    Math.max(
      daysPassed - daysRecorded,
      0
    )


  const averageDailyBill =
    daysRecorded > 0
      ? monthlyTotal /
        daysRecorded
      : 0


  const averagePerCalendarDay =
    daysPassed > 0
      ? monthlyTotal /
        daysPassed
      : 0


  const estimatedMonthlyBill =
    averagePerCalendarDay *
    daysInMonth


  const remainingDays =
    Math.max(
      daysInMonth - daysPassed,
      0
    )


  const estimatedRemainingSpend =
    Math.max(
      estimatedMonthlyBill -
        monthlyTotal,
      0
    )


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


  function goToPreviousMonth() {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    )

  }


  function goToNextMonth() {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    )

  }


  return (

    <section className="monthly-bill-page">

      {/* HEADER */}

      <div className="bill-page-header">

        <div>

          <span className="section-label">
            EXPENSE SUMMARY
          </span>

          <h2>
            💰 Monthly Bill
          </h2>

          <p>
            Track your mess spending
            throughout the month.
          </p>

        </div>

      </div>


      {/* MONTH NAVIGATION */}

      <div className="bill-month-card">

        <button
          className="bill-month-button"
          onClick={
            goToPreviousMonth
          }
          aria-label="Previous month"
        >
          ◀
        </button>


        <div className="bill-month-title">

          <span>
            {monthName}
          </span>

          {isCurrentMonth && (
            <small>
              Current month
            </small>
          )}

        </div>


        <button
          className="bill-month-button"
          onClick={
            goToNextMonth
          }
          aria-label="Next month"
        >
          ▶
        </button>

      </div>


      {/* MAIN TOTAL */}

      <div className="bill-total-card">

        <div>

          <span>
            TOTAL SPENT
          </span>

          <strong>
            ₹{monthlyTotal.toFixed(0)}
          </strong>

          <p>
            Across {daysRecorded}{' '}
            recorded day
            {daysRecorded !== 1
              ? 's'
              : ''}
          </p>

        </div>


        <div className="bill-total-icon">
          💰
        </div>

      </div>


      {/* SUMMARY */}

      <div className="bill-summary-new">

        <div className="bill-card-new">

          <div className="bill-card-icon">
            📈
          </div>

          <span>
            Estimated Total
          </span>

          <strong>
            ₹
            {estimatedMonthlyBill.toFixed(
              0
            )}
          </strong>

          <small>
            Month-end estimate
          </small>

        </div>


        <div className="bill-card-new">

          <div className="bill-card-icon">
            🧾
          </div>

          <span>
            Average / Day
          </span>

          <strong>
            ₹
            {averageDailyBill.toFixed(
              0
            )}
          </strong>

          <small>
            Recorded days
          </small>

        </div>


        <div className="bill-card-new">

          <div className="bill-card-icon">
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


        <div className="bill-card-new">

          <div className="bill-card-icon">
            ⏳
          </div>

          <span>
            Remaining Days
          </span>

          <strong>
            {remainingDays}
          </strong>

          <small>
            Days left in month
          </small>

        </div>

      </div>


      {/* PROGRESS */}

      <div className="bill-progress-card">

        <div className="bill-progress-header">

          <div>

            <span className="section-label">
              MONTHLY PROGRESS
            </span>

            <h3>
              Spending Overview
            </h3>

          </div>


          <strong>
            {progress.toFixed(0)}%
          </strong>

        </div>


        <div className="bill-progress-bar">

          <div
            className="bill-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <div className="bill-progress-info">

          <span>
            ₹{monthlyTotal.toFixed(0)}
            {' '}spent
          </span>

          <span>
            ₹
            {estimatedMonthlyBill.toFixed(
              0
            )}
            {' '}estimated
          </span>

        </div>

      </div>


      {/* ESTIMATE */}

      {isCurrentMonth &&
        daysRecorded > 0 && (

          <div className="estimate-card">

            <div className="estimate-icon">
              💡
            </div>


            <div>

              <strong>
                Month-end estimate
              </strong>

              <p>

                At your current average,
                you may spend around{' '}

                <strong>
                  ₹
                  {estimatedMonthlyBill.toFixed(
                    0
                  )}
                </strong>{' '}

                this month.

              </p>

              {remainingDays > 0 && (
                <small>

                  About ₹
                  {estimatedRemainingSpend.toFixed(
                    0
                  )}{' '}
                  estimated for the
                  remaining {remainingDays}{' '}
                  day
                  {remainingDays !== 1
                    ? 's'
                    : ''}.

                </small>
              )}

            </div>

          </div>

        )}


      {/* DAILY BREAKDOWN */}

      <div className="daily-breakdown-new">

        <div className="breakdown-header">

          <div>

            <span className="section-label">
              TRANSACTIONS
            </span>

            <h3>
              📋 Daily Breakdown
            </h3>

          </div>


          <span className="entry-count">
            {daysRecorded}{' '}
            entr
            {daysRecorded === 1
              ? 'y'
              : 'ies'}
          </span>

        </div>


        {monthlyEntries.length === 0 ? (

          <div className="empty-bill-new">

            <div className="empty-bill-icon">
              🍽️
            </div>

            <strong>
              No entries this month
            </strong>

            <p>
              Your food expenses will
              appear here once you
              start recording them.
            </p>

          </div>

        ) : (

          <div className="daily-entry-list">

            {monthlyEntries.map(
              (entry) => {

                const date =
                  new Date(
                    `${entry.date}T00:00:00`
                  )


                const dayName =
                  date.toLocaleDateString(
                    'default',
                    {
                      weekday: 'short',
                    }
                  )


                const dayNumber =
                  date.getDate()


                const foodNames =
                  entry.items
                    .map(
                      (itemId) =>
                        getItemName(
                          itemId
                        )
                    )


                return (

                  <div
                    className="daily-entry-new"
                    key={entry.date}
                  >

                    <div className="daily-date-box">

                      <span>
                        {dayName}
                      </span>

                      <strong>
                        {dayNumber}
                      </strong>

                    </div>


                    <div className="daily-food-info">

                      <strong>
                        {entry.date}
                      </strong>

                      <p>
                        {foodNames.join(
                          ', '
                        )}
                      </p>

                    </div>


                    <div className="daily-entry-total">

                      ₹{entry.total}

                    </div>

                  </div>

                )

              }
            )}

          </div>

        )}

      </div>


      {/* INFO */}

      <div className="bill-info-new">

        <span>
          📊 {daysRecorded} of {daysInMonth}{' '}
          days recorded
        </span>

        <span>
          💡 Missing days count as ₹0
        </span>

      </div>

    </section>

  )

}

export default MonthlyBill