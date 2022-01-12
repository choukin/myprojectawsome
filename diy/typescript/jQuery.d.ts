// declare let jQuery:(selector:string)=>any;
declare function jQuery(selector:string):any;
// 函数重载
declare function jQuery(domReadyCallback:()=>any):any;
declare namespace jQuery{
    interface AjaxSettings{
        method?:'GET'|'POST';
        data?:any;
    }
    // declare namespace 内部我们直接使用function 来声明函数而不使用 declare function  类似可以使用 const class enum
    function ajax(url:string,settings?:AjaxSettings):void;
    const version:number;
    class Event{
        blur(eventType:EventType):void;
    }
    enum EventType{
        CustomClick
    }

    namespace fn{
        function extend(object:any):void;
    }
}

// 如果只有 fn 可简写
declare namespace jQuery.fn {
    function extend(object: any): void;
}

// 暴露类型
interface AjaxSettings{
    method?:'GET'|'POST';
    data?:any;
}

