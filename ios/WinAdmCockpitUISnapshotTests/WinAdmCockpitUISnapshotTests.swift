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
    let app: XCUIApplication = XCUIApplication()

    let locale = NSLocale.current

    let navBar = app.navigationBars.element(boundBy: 0)
    waitForElementToAppear(element: navBar)
    snapshot(name: "Blank")

    let accountButton = navBar.buttons.element(boundBy: 1)

    accountButton.tap()

    let emailField = app.textFields.element
    emailField.typeText(getStringFor("handle", locale: locale)!)

    app.buttons[getStringFor("Next", locale: locale)!].tap()
    app.typeText(getStringFor("secret", locale: locale)!)

    snapshot(name: "Login")

    app.buttons[getStringFor("Go", locale: locale)!].tap()
    snapshot(name: "Overview")

    app.swipeUp()


    XCTAssert(true)
  }

  func getStringFor(_ term: String, locale: Locale) -> String? {
    return [
      "nl": ["Overview": "Overzicht", "Next": "Volgende", "Go": "Ga", "handle": "annemiek@abctotaal.nl", "secret": "geheim"],
      "en": ["Overview": "Overview", "Next": "Next", "Go": "Go", "handle": "anne@example.com", "secret": "secret"]
    ][locale.languageCode!]?[term]
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
