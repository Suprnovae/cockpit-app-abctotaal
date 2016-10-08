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

    func testExample() {
      let app = XCUIApplication()
      snapshot(name: "Blank")
      app.navigationBars["Resultaat"].children(matching: .button).element.tap()
      
      app.textFields["email"].typeText("annemiek@abctotaal.nl")
      print(app.secureTextFields["password"].debugDescription)
      //XCTAssert(app.secureTextFields["password"].accessibilityElementCount() == 2) //.typeText("geheim")
      //print(app.textFields["Email"].debugDescription);
      /*
      app.otherElements["     Password   Login "].textFields["Email"].typeText("annemiek@abc")
      app.typeText("totaal..n")
      app.otherElements["    annemiek@abctotaal.nl  Password   Login "].secureTextFields["Password"].typeText("")
      snapshot(name: "Login")

      app.otherElements["    Brutto Inkomen €18.000,00  18K Maart 2016   Netto inkomen €15.000,00  15K Maart 2016 "].otherElements["  Brutto Inkomen €18.000,00  18K Maart 2016   Netto inkomen €15.000,00  15K Maart 2016 "].otherElements[" Netto inkomen €15.000,00  15K Maart 2016 "].swipeUp()
      
      snapshot(name: "Overview")
      let image = app.otherElements["    Brutto Inkomen €18.000,00  18K Maart 2016   Netto inkomen €15.000,00  15K Maart 2016   Pandhuur €1.200,00  1K2 Maart 2016 "].otherElements["  Brutto Inkomen €18.000,00  18K Maart 2016   Netto inkomen €15.000,00  15K Maart 2016   Pandhuur €1.200,00  1K2 Maart 2016 "].otherElements[" Netto inkomen €15.000,00  15K Maart 2016 "].children(matching: .other).element(boundBy: 1).children(matching: .image).element(boundBy: 1)
      image.tap()
      image.swipeUp()
      */

      XCTAssert(true)
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
}
