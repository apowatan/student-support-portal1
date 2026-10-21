$(document).ready(function () {

  $("#menuBtn").click(function (e) {
    e.stopPropagation();
    let $nav =$("#navLinks");
    
    if ($nav.hasClass("hidden")) {
      $nav.removeClass("hidden")
          .addClass("flex flex-col absolute top-full right-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 gap-4 z-50");
    } else {
      $nav.addClass("hidden").removeClass("flex flex-col absolute top-full right-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 gap-4 z-50");
    }
  });

  $("#navLinks a").click(function () {
    if ($(window).width() < 768) {$("#navLinks").addClass("hidden").removeClass("flex flex-col absolute top-full right-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 gap-4 z-50");
    }
  });


  $(document).click(function (e) {
    if (!$(e.target).closest("header").length && $(window).width() < 768) {$("#navLinks").addClass("hidden").removeClass("flex flex-col absolute top-full right-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 gap-4 z-50");
    }
  });

  
  $('a[href^="#"]').click(function (e) {
    let target = $(this).attr("href");
    if (target !== "#" && $(target).length) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: $(target).offset().top - 70
      }, 600);
    }
  });

  
  $(".filter-btn").click(function () {
    let filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    $("#issueSearch").val(""); 

    if (filter === "all") {
      $(".issue-card").stop(true, true).fadeIn(500);
    } else {
      $(".issue-card").hide();
      $("." + filter).stop(true, true).fadeIn(500);
    }
  });

  $("#issueSearch").on("keyup", function () {
    let value = $(this).val().toLowerCase().trim();

    $(".issue-card").each(function () {
      let text = $(this).text().toLowerCase();
      if (text.includes(value)) {
        $(this).stop(true, true).fadeIn(200);       } else {$(this).stop(true, true).fadeOut(200);
      }
    });

    if (value !== "") {
      $(".filter-btn").removeClass("active");
    } else {
      $(".filter-btn[data-filter='all']").addClass("active");
    }
  });


  $(".view-solution-btn").click(function () {
    let card = $(this).closest(".issue-card");
    $("#modalTitle").text(card.data("title"));
    $("#modalCategory").text(card.data("category"));
    $("#modalSolutionText").text(card.data("solution"));

    $("#solutionModal").css("display", "flex").hide().fadeIn(250);
  });

  function closeSolutionModal() {
    $("#solutionModal").fadeOut(500);
  }

  $(".close-modal").click(closeSolutionModal);

  $("#solutionModal").click(function (e) {
    if (e.target === this) {
      closeSolutionModal();
    }
  });

  $("#copySolutionBtn").click(function () {
    let title = $("#modalTitle").text();
    let textToCopy = `📌 *${title}*\n\n✅ *الحل والخطوات:*\n${$("#modalSolutionText").text()}\n\n---\nدليل مشاكل التسجيل الجامعي`;

    navigator.clipboard.writeText(textToCopy).then(function () {
      let btn = $("#copySolutionBtn span");
      btn.text("تم النسخ للحافظة!");
      setTimeout(function () {
        btn.text("نسخ الحل للقروب");
      }, 2000);
    });
  });

  function generateAndOpenLetter() {
    let nameVal = $("#genStudentName").val();
    let idVal = $("#genStudentId").val();
    let majorVal = $("#genMajor").val();
    let courseVal = $("#genCourseDetails").val();
    let issueType = $("#genIssueType").val();

    let name = (nameVal && nameVal.trim()) ? nameVal.trim() : "عمرو محمد ابو جامع";
    let id = (idVal && idVal.trim()) ? idVal.trim() : "1320230293";
    let major = (majorVal && majorVal.trim()) ? majorVal.trim() : "نظم معلومات";
    let course = (courseVal && courseVal.trim()) ? courseVal.trim() : "برمجة ويب (1) - شعبة 102";

    let officialName = "";
    let officialPhone = "";
    let subjectText = "";
    let messageBody = "";

    switch (issueType) {
      case "closed_section":
        officialName = "د. أشرف (رئيس القسم)";
        officialPhone = "0599602989";
        subjectText = "طلب فتح شُعبة مغلقة - الطالب: " + name + " (" + id + ")";
        messageBody = "يديك العافية يا دكتور أشرف،\n\n" +
          "أنا الطالب: " + name + "\n" +
          "الرقم الجامعي: " + id + "\n" +
          "التخصص: " + major + "\n\n" +
          "مشكلتي بخصوص مساق (" + course + ")، حيث أن الشعبة مغلقة بالكامل مما لا أستطيع التسجيل إلا عن طريقك، يرجى التكرم بمساعدتي في إضافتها لحاجتي الماسة للمساق في الخطة الدراسية وعدم تعطل تخرجي.\n\n" +
          "شاكراً لك حسن تعاونك دكتور.";
        break;

      case "tuition_fees":
        officialName = "أ. محمود عويضة (المدير المالي)";
        officialPhone = "0598020030";
        subjectText = "تأخر اعتماد الرسوم وتفعيل البوابة - الطالب: " + name + " (" + id + ")";
        messageBody = "يعطيك العافية أ. محمود عويضة،\n\n" +
          "أنا الطالب: " + name + "\n" +
          "الرقم الجامعي: " + id + "\n" +
          "التخصص: " + major + "\n\n" +
          "مشكلتي قمت بدفع الرسوم الجامعية المقررة ولكن حسابي والبوابة لم يتم تفعيلهما بعد لتنزيل المواد، يرجى التكرم بتدقيق الدفعة وتفعيل ملفي للتسجيل.\n\n" +
          "بوركت جهودكم.";
        break;

      case "prerequisite":
        officialName = "د. جهاد الزطمة (الشؤون الأكاديمية)";
        officialPhone = "0599000000";
        subjectText = "طلب استثناء متطلب سابق - الطالب: " + name + " (" + id + ")";
        messageBody = "يعطيك العافية يا دكتور جهاد الزطمة،\n\n" +
          "أنا الطالب: " + name + "\n" +
          "الرقم الجامعي: " + id + "\n" +
          "التخصص: " + major + "\n\n" +
          "مشكلتي هي تعذر تنزيل مساق (" + course + ") بسبب المتطلب السابق غير مستوفى، ونظراً لظروفي الدراسية وقرب تخرجي يرجى التكرم بالموافقة على تنزيله تزامناً أو استثنائياً لانتظام خطتي وعدم تأخر التخرج.\n\n" +
          "مع كل الشكر والتقدير دكتور جهاد.";
        break;

      case "portal_login":
        officialName = "الدعم الفني - مركز الحاسوب وتكنولوجيا المعلومات";
        officialPhone = "0599000000";
        subjectText = "مشكلة فقدان كلمة مرور البوابة - الطالب: " + name + " (" + id + ")";
        messageBody = "السلام عليكم ورحمة الله، الإخوة في الدعم الفني ومركز الحاسوب،\n\n" +
          "أنا الطالب: " + name + "\n" +
          "الرقم الجامعي: " + id + "\n" +
          "التخصص: " + major + "\n\n" +
          "أواجه مشكلة في فقدان كلمة المرور الخاصة بحسابي على البوابة الأكاديمية وعدم قدرتي على استعادتها ذاتياً، أرجو المساعدة في إعادة ضبط بيانات الدخول الخاصة بي.\n\n" +
          "شاكراً لكم حسن تعاونكم.";
        break;
    }

    $("#targetOfficialName").text(officialName);
    $("#targetOfficialPhoneLink").text(officialPhone).attr("href", "tel:" + officialPhone);
    $("#btnCallOfficial").attr("href", "tel:" + officialPhone);
    $("#genEmailSubject").text(subjectText);
    $("#genEmailBody").val(messageBody);

    $("#letterModalOverlay").addClass("active");
  }

  function closeLetterModal() {
    $("#letterModalOverlay").removeClass("active");
  }

  $("#btnGenerateEmail").on("click", function (e) {
    e.preventDefault();
    generateAndOpenLetter();
  });

  $("#closeLetterModalBtn").on("click", closeLetterModal);
  $("#letterModalOverlay").on("click", function (e) {
    if (e.target === this) {
      closeLetterModal();
    }
  });

  $("#btnCopyGenEmail").on("click", function () {
    let emailText = $("#genEmailBody").val();
    navigator.clipboard.writeText(emailText).then(function () {
      let $btn =$("#btnCopyGenEmail span");
      $btn.text("تم النسخ بنجاح!");
      setTimeout(function () {
        $btn.text("نسخ نص الرسالة للواتساب");
      }, 2000);
    });
  });

  $(document).keydown(function (e) {
    if (e.key === "Escape") {
      closeSolutionModal();
      closeLetterModal();
      if ($(window).width() < 768) {$("#navLinks").addClass("hidden").removeClass("flex flex-col absolute top-full right-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 gap-4 z-50");
      }
    }
  });

});