function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!');  // eslint-disable-line
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        let isAdd = false;
        // 是否包含
        isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}
/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(routePath =>
        routePath.indexOf(path) === 0 && routePath !== path);
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ''));
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map((item) => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
            exact,
        };
    });
    return renderRoutes;
}

export function getPlainNode(nodeList, parentPath = '') {
    const arr = [];
    nodeList.forEach((node) => {
        const item = node;
        item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}
