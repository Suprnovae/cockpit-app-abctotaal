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

    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
  }

  override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    super.tearDown()
  }

  func testLoginAndOverviewFlow() {
    let app = XCUIApplication()

    let overview = app.navigationBars["Overview"]
    waitForElementToAppear(element: overview)
    snapshot(name: "Blank")

    let accountButton = overview.buttons.element(boundBy: 1)

    print("app elements \(app.debugDescription)")
    print("app.navigationBars Overview \(app.navigationBars["Overview"])")
    print("accountButton \(accountButton.debugDescription)")

    accountButton.tap()

    let emailField = app.textFields.element
    emailField.typeText("annemiek@abctotaal.nl")

    app.buttons["Next"].tap()
    app.typeText("geheim")

    snapshot(name: "Login")

    app.buttons["Go"].tap()
    snapshot(name: "Overview")

    app.swipeUp()

    print("launch env: \(app.launchEnvironment.debugDescription)")
    print("launch args: \(app.launchArguments.debugDescription)")

    XCTAssert(true)
  }

  func waitForElementToAppear(element: XCUIElement, timeout: TimeInterval = 5,  file: String = #file, line: UInt = #line) {
    let existsPredicate = NSPredicate(format: "exists == true")

    expectation(for: existsPredicate, evaluatedWith: element, handler: nil)

    waitForExpectations(timeout: timeout) { (error) -> Void in
      if (error != nil) {
        let message = "Failed to find \(element) after \(timeout) seconds."
        self.recordFailure(withDescription: message, inFile: file, atLine: line, expected: true)
      }
    }
  }
}
