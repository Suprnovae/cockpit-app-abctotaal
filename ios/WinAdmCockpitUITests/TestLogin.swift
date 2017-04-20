//
//  TestLogin.swift
//  WinAdmCockpit
//
//  Created by zirconias on 4/19/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import XCTest

class TestLogin: XCTestCase {
  
    func testLoginFailed() {
      
      let app = XCUIApplication()
      setupSnapshot(app)
      app.launch()
      app.buttons["NavBarButtonAccount"].tap()

      snapshot("loginScreen01")

      app.textFields["test-id-email-field"].tap()
      app.textFields["test-id-email-field"].typeText("anne@example.com")
      app.typeText("\n")
      
      app.secureTextFields["test-id-password-field"].typeText("secrett")
  
      app.typeText("\n")
      
      snapshot("loginScreen02")
      //      app.alerts["Invalid credentials"].buttons["OK"].tap()

      
      XCTAssert(true)
    }
  
  
  
  
}
