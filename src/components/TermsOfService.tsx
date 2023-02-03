import { faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { MainWindow } from "../types/interfaces/mainWindow";

export function TermsOfService({ setWindow }: MainWindow) {
  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue) {
      setWindow(0);
    }
  };
  return (
    <div className="blurContainer" data-value="parent" onClick={clickParent}>
      <div className="container">
        <div className="x" onClick={() => setWindow(0)}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <h1>Terms Of Service</h1>
        <div className="document">
        <h2>Lorem Ipsum</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolore qui nulla pariatur optio voluptatum vel molestias nesciunt quibusdam. Fugiat, fuga praesentium? Dolore autem quidem nostrum vero ad reprehenderit laudantium aliquid ratione deserunt ipsa ipsum iste exercitationem possimus dignissimos magni nemo nobis quae, ea eos numquam recusandae quam dicta deleniti quod! Similique dolorum vel corporis commodi. Consequatur molestias laborum hic, debitis, voluptatibus praesentium corporis sunt deserunt iusto rerum enim ipsa unde aut, eius velit minus architecto atque totam modi assumenda.</p>
        <h2>Lorem Ipsum</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus reiciendis deserunt. Dolore beatae nostrum hic molestias, ipsa distinctio tenetur itaque totam tempore id doloribus rem eaque sequi assumenda numquam debitis? Possimus eum sapiente soluta maiores incidunt neque totam adipisci culpa quidem rerum atque, quae quod doloribus, ut veritatis labore.</p>
        <h2>Lorem Ipsum</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor deleniti magni laboriosam corrupti quia, laudantium hic quo dolorum fuga, modi nulla eligendi, laborum odit minus ex nam quae voluptatem sint quos consequatur aspernatur error reprehenderit. Consequatur doloremque earum non vitae. Eum aliquam nisi nemo ea tempore soluta magnam unde, perferendis sed, exercitationem vel quod omnis! Blanditiis, qui accusantium tenetur quibusdam voluptas saepe harum placeat a sequi, id officia nobis labore quasi voluptates autem nisi tempore ad at voluptate unde similique. Aspernatur provident modi numquam. Natus, labore rerum perspiciatis aut impedit tempore quis odio non temporibus amet sequi eveniet ex suscipit ratione, veniam velit pariatur libero, debitis quidem. Reprehenderit, ratione mollitia. At distinctio asperiores ipsum doloribus, officia adipisci unde suscipit numquam alias cumque amet consequuntur minus quam repellendus aliquid. In unde, corporis doloribus, nisi atque sunt aut suscipit illo aperiam expedita quisquam autem numquam repellendus laborum aspernatur, incidunt voluptatibus optio nobis.</p>
        </div>
      </div>
    </div>
  );
}