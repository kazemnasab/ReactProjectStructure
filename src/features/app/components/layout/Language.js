import React from 'react'

export default function Language() {
  return (
    <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
                    <a className="nav-link dropdown-toggle hide-arrow"  data-bs-toggle="dropdown">
                      <i className="fi fi-ir fis rounded-circle fs-3 me-1"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item"  data-language="fa">
                          <i className="fi fi-ir fis rounded-circle fs-4 me-1"></i>
                          <span className="align-middle">فارسی</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item"  data-language="en">
                          <i className="fi fi-us fis rounded-circle fs-4 me-1"></i>
                          <span className="align-middle">انگلیسی</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item"  data-language="fr">
                          <i className="fi fi-fr fis rounded-circle fs-4 me-1"></i>
                          <span className="align-middle">فرانسوی</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item"  data-language="de">
                          <i className="fi fi-de fis rounded-circle fs-4 me-1"></i>
                          <span className="align-middle">آلمانی</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item"  data-language="pt">
                          <i className="fi fi-pt fis rounded-circle fs-4 me-1"></i>
                          <span className="align-middle">پرتغالی</span>
                        </a>
                      </li>
                    </ul>
                  </li>
  )
}
