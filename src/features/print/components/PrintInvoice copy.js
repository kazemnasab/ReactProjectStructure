import React from "react";
import { useReactToPrint } from "react-to-print";
import { FactorApi, FactorItemApi } from "features/repositories";

<link
  rel="stylesheet"
  href="%PUBLIC_URL%/assets/vendor/css/pages/app-invoice-print.css"
  type="text/css"
/>;

export default function PrintInvoice(props) {
  const { factorId } = props;
  const [factor, setFactor] = React.useState(null);
  const [factorItems, setFactorItems] = React.useState([]);
  const printRef = React.useRef();
  const handleClick = useReactToPrint({
    content: () => printRef.current,
  });
  React.useEffect(() => {
    FactorApi.GetById(factorId)
      .apply()
      .then((res) => setFactor(res.data));
    FactorItemApi.Get({ factorId: factorId })
      .apply()
      .then((res) => setFactorItems(res.data));
  }, [factorId]);
  return (
    <div ref={printRef} id="main" class="invoice-print p-5">
      <div class="d-flex justify-content-between flex-row">
        <div class="mb-4">
          <div class="d-flex align-items-center svg-illustration mb-3 gap-2">
            <svg width="26px" height="26px" viewbox="0 0 26 26" version="1.1">
              <title>آیکن</title>
              <defs>
                <lineargradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="linearGradient-1"
                >
                  <stop stop-color="#5A8DEE" offset="0%"></stop>
                  <stop stop-color="#699AF9" offset="100%"></stop>
                </lineargradient>
                <lineargradient
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  id="linearGradient-2"
                >
                  <stop stop-color="#FDAC41" offset="0%"></stop>
                  <stop stop-color="#E38100" offset="100%"></stop>
                </lineargradient>
              </defs>
              <g
                id="Pages"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Login---V2"
                  transform="translate(-667.000000, -290.000000)"
                >
                  <g id="Login" transform="translate(519.000000, 244.000000)">
                    <g id="Logo" transform="translate(148.000000, 42.000000)">
                      <g id="icon" transform="translate(0.000000, 4.000000)">
                        <path
                          d="M13.8863636,4.72727273 C18.9447899,4.72727273 23.0454545,8.82793741 23.0454545,13.8863636 C23.0454545,18.9447899 18.9447899,23.0454545 13.8863636,23.0454545 C8.82793741,23.0454545 4.72727273,18.9447899 4.72727273,13.8863636 C4.72727273,13.5423509 4.74623858,13.2027679 4.78318172,12.8686032 L8.54810407,12.8689442 C8.48567157,13.19852 8.45300462,13.5386269 8.45300462,13.8863636 C8.45300462,16.887125 10.8856023,19.3197227 13.8863636,19.3197227 C16.887125,19.3197227 19.3197227,16.887125 19.3197227,13.8863636 C19.3197227,10.8856023 16.887125,8.45300462 13.8863636,8.45300462 C13.5386269,8.45300462 13.19852,8.48567157 12.8689442,8.54810407 L12.8686032,4.78318172 C13.2027679,4.74623858 13.5423509,4.72727273 13.8863636,4.72727273 Z"
                          id="Combined-Shape"
                          fill="#4880EA"
                        ></path>
                        <path
                          d="M13.5909091,1.77272727 C20.4442608,1.77272727 26,7.19618701 26,13.8863636 C26,20.5765403 20.4442608,26 13.5909091,26 C6.73755742,26 1.18181818,20.5765403 1.18181818,13.8863636 C1.18181818,13.540626 1.19665566,13.1982714 1.22574292,12.8598734 L6.30410592,12.859962 C6.25499466,13.1951893 6.22958398,13.5378796 6.22958398,13.8863636 C6.22958398,17.8551125 9.52536149,21.0724191 13.5909091,21.0724191 C17.6564567,21.0724191 20.9522342,17.8551125 20.9522342,13.8863636 C20.9522342,9.91761479 17.6564567,6.70030817 13.5909091,6.70030817 C13.2336969,6.70030817 12.8824272,6.72514561 12.5388136,6.77314791 L12.5392575,1.81561642 C12.8859498,1.78721495 13.2366963,1.77272727 13.5909091,1.77272727 Z"
                          id="Combined-Shape2"
                          fill="url(#linearGradient-1)"
                        ></path>
                        <rect
                          id="Rectangle"
                          fill="url(#linearGradient-2)"
                          x="0"
                          y="0"
                          width="7.68181818"
                          height="7.68181818"
                        ></rect>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>

            <span class="app-brand-text h3 mb-0 fw-bold">زمان آوران پیشرو</span>
          </div>
          <p class="mb-1">تبریز، خبایان آبرسان، فلکه دانشگاه</p>
          <p class="mb-1">برج بلور، طبقه 85، واحد 345</p>
          <p class="mb-0">
            <span class="d-inline-block" dir="ltr">
              +1 (123) 456 7891
            </span>{" "}
            ،{" "}
            <span class="d-inline-block" dir="ltr">
              +44 (876) 543 2198
            </span>
          </p>
        </div>
        <div>
          <h4>صورتحساب #{ factor ? factor.number : ""}</h4>
          <div class="mb-2">
            <span>تاریخ صدور:</span>
            <span class="fw-semibold">25 فروردین 1401</span>
          </div>
          <div>
            <span>تاریخ سررسید:</span>
            <span class="fw-semibold">25 اردیبهشت 1401</span>
          </div>
        </div>
      </div>

      <hr />

      <div class="row d-flex justify-content-between mb-4">
        <div class="col-sm-6 w-50">
          <h6>صورتحساب به:</h6>
          <p class="mb-1">تونی استارک</p>
          <p class="mb-1">شرکت صنایع استارک</p>
          <p class="mb-1">تبریز، آبرسان، برج بلور، طبقه 85</p>
          <p class="mb-1">718-986-6062</p>
          <p class="mb-0">peakyFBlinders@gmail.com</p>
        </div>
        <div class="col-sm-6 w-50">
          <h6>قبض به:</h6>
          <table class="lh-2">
            <tbody>
              <tr>
                <td class="pe-3">مجموع سررسید:</td>
                <td>12,000,000 تومان</td>
              </tr>
              <tr>
                <td class="pe-3">نام بانک:</td>
                <td>بانک آمریکا</td>
              </tr>
              <tr>
                <td class="pe-3">کشور:</td>
                <td>ایالات متحده</td>
              </tr>
              <tr>
                <td class="pe-3">IBAN:</td>
                <td>ETD95476213874685</td>
              </tr>
              <tr>
                <td class="pe-3">کد SWIFT:</td>
                <td>BR91905</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table border-top m-0">
          <thead>
            <tr>
              <th>مورد</th>
              <th>شرح</th>
              <th>هزینه</th>
              <th>تعداد</th>
              <th>قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>32,000 تومان</td>
              <td>1</td>
              <td>32,000 تومان</td>
            </tr>
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>22,000 تومان</td>
              <td>1</td>
              <td>22,000 تومان</td>
            </tr>
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>17,000 تومان</td>
              <td>2</td>
              <td>34,000 تومان</td>
            </tr>
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>{" "}
            <tr>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>لورم ایپسوم متن ساختگی</td>
              <td>66,000 تومان</td>
              <td>1</td>
              <td>66,000 تومان</td>
            </tr>
            <tr>
              <td colspan="3" class="align-top px-4 py-3">
                <p class="mb-2">
                  <span class="me-1 fw-bold">فروشنده:</span>
                  <span>استیو راجرز</span>
                </p>
                <span>با تشکر از کسب و کار شما</span>
              </td>
              <td class="text-end px-4 py-3">
                <p class="mb-2">جمع جزء:</p>
                <p class="mb-2">تخفیف:</p>
                <p class="mb-2">مالیات:</p>
                <p class="mb-0">جمع کل:</p>
              </td>
              <td class="px-4 py-3">
                <p class="fw-semibold mb-2">154,000 تومان</p>
                <p class="fw-semibold mb-2">0 تومان</p>
                <p class="fw-semibold mb-2">50,000 تومان</p>
                <p class="fw-semibold mb-0">204,000 تومان</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-12 lh-1-85 mt-3">
          <span class="fw-semibold">یادداشت:</span>
          <span>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
          </span>
        </div>
      </div>
    </div>
  );
}
