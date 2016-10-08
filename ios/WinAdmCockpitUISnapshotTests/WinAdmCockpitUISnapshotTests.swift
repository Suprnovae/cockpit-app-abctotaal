//
//  WinAdmCockpitUISnapshotTests.swift
//  WinAdmCockpitUISnapshotTests
//
//  Created by David Asabina on 07/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class WinAdmCockpitUISnapshotTests: XCTestCase {

  //var app: XCUIApplication

  override func setUp() {
      super.setUp()

        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        let app = XCUIApplication()
        app.launch()
        print(app.debugDescription)

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

    func testLoginAndOverviewFlow() {
      let app = XCUIApplication()
      app.navigationBars["Resultaat"].children(matching: .button).element.tap()
      snapshot(name: "Blank")

      let emailField = app.textFields.element
      emailField.typeText("annemiek@abctotaal.nl")
      //XCTAssert(false, app.buttons["Next"].debugDescription)
      app.buttons["Next"].tap()
      app.typeText("geheim")
      snapshot(name: "Login")

      app.buttons["Go"].tap()
      snapshot(name: "Overview")

      app.swipeUp()

      XCTAssert(true)
    }
}
